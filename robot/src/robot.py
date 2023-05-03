from pybricks.hubs import EV3Brick
from pybricks.ev3devices import Motor, UltrasonicSensor
from pybricks.parameters import Port
from pybricks.robotics import DriveBase

import uasyncio


class Robot:
    def __init__(self):
        self.ev3 = EV3Brick()

        # Create object for the drivebase
        left_motor = Motor(Port.A)
        right_motor = Motor(Port.B)
        self.drive_base = DriveBase(
            left_motor, right_motor, wheel_diameter=50, axle_track=90)

        self.ultrasonic_sensor = UltrasonicSensor(Port.S4)

    def obstacle_in_front(self):
        return self.ultrasonic_sensor.distance() > 300

    async def patrol(self, _):
        while True:
            # Begin driving forward at 200 millimeters per second.
            self.drive_base.drive(200, 0)

            # Wait until an obstacle is detected. This is done by repeatedly
            # doing nothing (waiting for 10 milliseconds) while the measured
            # distance is still greater than 300 mm.
            while not self.obstacle_in_front():
                uasyncio.wait_ms(10)

            # Drive backward for 300 millimeters.
            self.drive_base.straight(-300)

            # Turn around by 120 degrees
            self.drive_base.turn(120)
