#!/usr/bin/env pybricks-micropython

from src.event import EventSource
from test.connection import test_hello
from robot import Robot

import uasyncio


def main():
    # Change IP to the server's IP
    es = EventSource('127.0.0.1', '/api/v1/robot/command', 8080)
    robot = Robot()
    es.add_event_listener('Patrol', robot.patrol)

    loop = uasyncio.get_event_loop()
    # test_hello()
    loop.run_forever()


# Write your program here.
if __name__ == '__main__':
    print("Starting robot...")
    main()
