#!/usr/bin/env pybricks-micropython
from pybricks.hubs import EV3Brick
from pybricks.ev3devices import (Motor, TouchSensor, ColorSensor,
                                 InfraredSensor, UltrasonicSensor, GyroSensor)
from pybricks.parameters import Port, Stop, Direction, Button, Color
from pybricks.tools import wait, StopWatch, DataLog
from pybricks.robotics import DriveBase
from pybricks.media.ev3dev import SoundFile, ImageFile
import control


if __name__ == "__main__":
    # Create object for EV3 and its sensors
    ev3 = EV3Brick()
    left_motor = Motor(Port.A)
    right_motor = Motor(Port.B)
    obstacle_sensor = UltrasonicSensor(Port.S4)

    # Create object for the drivebase
    robot = DriveBase(left_motor, right_motor, wheel_diameter=50, axle_track=90)

    # Start automatic mode
    test_automatic_movement(robot, obstacle_sensor)
