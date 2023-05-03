#!/usr/bin/env pybricks-micropython
from pybricks.hubs import EV3Brick
from pybricks.ev3devices import (Motor, TouchSensor, ColorSensor,
                                 InfraredSensor, UltrasonicSensor, GyroSensor)
from pybricks.parameters import Port, Stop, Direction, Button, Color
from pybricks.tools import wait, StopWatch, DataLog
from pybricks.robotics import DriveBase
from pybricks.media.ev3dev import SoundFile, ImageFile

from src.event import EventSource
# from src.movement import move, beep
# from src.patrol import patrol
from test.connection import test_hello

import control
import uasyncio
import turning


def main():
    # es = EventSource('127.0.0.1', '/api/v1/robot/hello', 8080)
    # es.add_event_listener('Beep', beep)
    # es.add_event_listener('Move', move)
    # es.add_event_listener('Patrol', patrol)

    loop = uasyncio.get_event_loop()
    # loop.create_task(func)
    test_hello()
    loop.run_forever()


def test_robot():
  # Create object for EV3 and its sensors
  ev3 = EV3Brick()
  left_motor = Motor(Port.A)
  right_motor = Motor(Port.B)
  obstacle_sensor = UltrasonicSensor(Port.S4)
  gyro_sensor  = GyroSensor(Port.S3)

  # Create object for the drivebase
  robot = DriveBase(left_motor, right_motor, wheel_diameter=50, axle_track=90)

  # Start automatic mode
  test_automatic_movement(robot, obstacle_sensor,gyro_sensor)


# Write your program here.
if __name__ == '__main__':
    print("Starting robot...")
    main()
    # test_robot()
