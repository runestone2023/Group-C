#!/usr/bin/env pybricks-micropython

from src.event import EventSource
from src.control import test_automatic_movement
# from src.movement import move, beep
# from src.patrol import patrol
from test.connection import test_hello

import uasyncio


def main():
    # Change IP to the server's IP
    es = EventSource('127.0.0.1', '/api/v1/robot/command', 8080)
    es.add_event_listener('Patrol', test_robot)

    loop = uasyncio.get_event_loop()

    # test_hello()
    loop.run_forever()


def test_robot():
  # Create object for EV3 and its sensors
  ev3 = EV3Brick()
  left_motor = Motor(Port.A)
  right_motor = Motor(Port.B)
  obstacle_sensor = UltrasonicSensor(Port.S4)

  # Create object for the drivebase
  robot = DriveBase(left_motor, right_motor, wheel_diameter=50, axle_track=90)

  # Start automatic mode
  test_automatic_movement(robot, obstacle_sensor)


# Write your program here.
if __name__ == '__main__':
    print("Starting robot...")
    main()
