#!/usr/bin/env pybricks-micropython

from src.event import EventSource
from test.connection import test_hello
from robot import Robot

import uasyncio
import turning


def main():
    # Change IP to the server's IP
    es = EventSource('127.0.0.1', '/api/v1/robot/command', 8080)
    robot = Robot()
    es.add_event_listener('Patrol', robot.patrol)

    loop = uasyncio.get_event_loop()
    # test_hello()
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
