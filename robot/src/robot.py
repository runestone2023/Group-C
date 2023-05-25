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
        self.gyro_sensor = GyroSensor(Port.S3)
        self.GSPK = 2.5

        self.routes = {1: [Event("MoveDistance", '{argument: 300}'), Event("Rotate", '{argument: 90}'),
                           Event("MoveDistance", '{argument: 300}'), Event("Rotate", '{argument: 90}',
                           Event("MoveDistance", '{argument: 300}'), Event("Rotate", '{argument: 90}'))]}

        self.event_source = event_source


    async def set_movement_speed(self, event):
        speed = event.json.get('argument')
        self.drive_base.settings(speed=speed)


    # Get the distance traveled by the robot in centimeters
    async def distance_travelled(self):
        return self.drive_base.distance()


    async def obstacle_in_front(self):
        return self.ultrasonic_sensor.distance() > 300


    async def stop_moving(self):
        self.drive_base.stop()


    async def move(self, event):
        '''
        This event takes MovementSpeed and RotationSpeed which both can be negative for going backwards/rotating opposite direction.
        '''
        movement_speed, rotation_speed = event.json.get("Move")

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
        distance = event.json.get('argument')

        self.gyro_sensor.reset_angle(0)
        cur_distance = self.drive_base.distance()

        # Avoid drifting when driving straight
        while True:
            correction = -1 * self.gyro_sensor.angle() * self.GSPK

            self.drive_base.drive(distance, correction)

            distance_travelled = self.drive_base.distance() - cur_distance

            if distance_travelled >= distance:
                self.drive_base.stop()


    # Positive angle is clockwise, negative angle is counterclockwise
    async def rotate(self, event):
        angle = event.json.get('argument')

        self.gyro_sensor.reset_angle(0)

        self.drive_base.turn(angle)

        # Correct for overshoot
        correction = -1 * (self.gyro_sensor.angle() - angle)
        self.drive_base.turn(correction)


    async def follow_route(self, event):
        route_id = event.json.get('argument')
        route = self.routes.get(route_id)
        for event in route:
            self.event_source.dispatch(event)


    async def patrol(self, _):

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
