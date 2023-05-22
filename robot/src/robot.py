from pybricks.hubs import EV3Brick
from pybricks.ev3devices import Motor, UltrasonicSensor
from pybricks.parameters import Port
from pybricks.robotics import DriveBase
from event import Event
import uasyncio


class Robot:
    def __init__(self, event_source):
        self.ev3 = EV3Brick()

        # Create object for the drivebase
        left_motor = Motor(Port.A)
        right_motor = Motor(Port.B)
        self.drive_base = DriveBase(
            left_motor, right_motor, wheel_diameter=50, axle_track=90)

        self.ultrasonic_sensor = UltrasonicSensor(Port.S4)
        self.gyro_sensor = GyroSensor(Port.S1)
        self.GSPK = 2.5

        self.routes = []

        self.event_source = event_source

        self.patrol_flag = False


    # Get the distance traveled by the robot in centimeters
    async def distance_travelled(self):
        return self.drive_base.distance()


    async def obstacle_in_front(self):
        return self.ultrasonic_sensor.distance() > 300


    def stop_moving(self, event):
        uasyncio.get_event_loop().stop()


    async def move(self, event):
        '''
        This event takes MovementSpeed and RotationSpeed which both can be negative for going backwards/rotating opposite direction.
        '''
        movement_speed = event.json.get('MovementSpeed')
        rotation_speed = event.json.get('RotationSpeed')

        self.gyro_sensor.reset_angle(0)

        # Avoid drifting when driving straight
        if rotation_speed is 0:
            while True:
                correction = -1 * self.gyro_sensor.angle() * self.GSPK
                self.drive_base.drive(movement_speed, correction)
        else:
            self.drive_base.drive(movement_speed, rotation_speed)
                              
                              
    # Positive distance is forward, negative distance is backward
    async def move_distance(self, event):
        distance = event.data

        self.drive_base.straight(distance)


    # Positive angle is clockwise, negative angle is counterclockwise
    async def rotate(self, event):
        angle = event.data

        self.gyro_sensor.reset_angle(0)

        self.drive_base.turn(angle)

        # Correct for overshoot
        correction = -1 * (self.gyro_sensor.angle() - angle)
        self.drive_base.turn(correction)


    async def start_patrol(self, event):
        route_id = event.json.get('Patrol')
        route = self.routes[route_id]
        self.patrol_flag = True

        while self.patrol_flag:
            for event in route:
                self.event_source.dispatch(event)
                await uasyncio.sleep(1)

    @staticmethod
    def into_event(command):
        """
        Unpack the first item in a dict into a tuple
        This is needed because our dicts are a single key-value pair 
        but in general they contain more than one.
        """
        if type(command) == str:
            return Event(command)

        for key, value in command.items():
            return Event(key, value)

    async def save_routes(self, event):
        self.routes = []
        for route in event.json:
            converted_route = [self.into_event(command) for command in route['commands']]
            self.routes.append(converted_route)
        print(self.routes)
        #self.event_source.dispatch(Event("Patrol", '{"Patrol": 0}'))

    async def test_patrol(self, _):
        self.gyro_sensor.reset_angle(0)

        while True:
            correction = -1 * self.gyro_sensor.angle() * self.GSPK

            # Begin driving forward at 200 millimeters per second.
            self.drive_base.drive(200, correction)

            # Wait until an obstacle is detected. This is done by repeatedly
            # doing nothing (waiting for 10 milliseconds) while the measured
            # distance is still greater than 300 mm.
            while not self.obstacle_in_front():
                uasyncio.wait_ms(10)

            # Drive backward for 300 millimeters.
            self.drive_base.straight(-300)

            # Turn around by 120 degrees
            self.drive_base.turn(120)
