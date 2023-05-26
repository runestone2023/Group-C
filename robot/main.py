#!/usr/bin/env pybricks-micropython

from src.event import EventSource
from test.connection import test_hello
from robot import Robot

import uasyncio

async def get_routes():
    GET_STR = "GET {} HTTP/1.0\r\n\r\n".format("/api/v1/robot/command/patrol/all")
    reader, writer = await uasyncio.open_connection('172.20.10.2', 8080)
    await writer.awrite(GET_STR.encode('utf-8'))

def main():
    # Change IP to the server's IP
    es = EventSource('127.0.0.1', '/api/v1/robot/command', 8080)
    robot = Robot(es)
    es.add_event_listener('Patrol', robot.start_patrol)
    es.add_event_listener('Route', robot.save_routes)
    es.add_event_listener('Rotate', robot.rotate)
    es.add_event_listener('Move', robot.move)
    es.add_event_listener('StopPatrol', robot.stop_moving)
    es.add_event_listener('MoveDistance', robot.move_distance)

    loop = uasyncio.get_event_loop()
    loop.create_task(get_routes())
    loop.run_forever()


# Write your program here.
if __name__ == '__main__':
    print("Starting robot...")
    main()
