#!/usr/bin/env pybricks-micropython
from pybricks.hubs import EV3Brick
from pybricks.ev3devices import (Motor, TouchSensor, ColorSensor,
                                 InfraredSensor, UltrasonicSensor, GyroSensor)
from pybricks.parameters import Port, Stop, Direction, Button, Color
from pybricks.tools import wait, StopWatch, DataLog
from pybricks.robotics import DriveBase
from pybricks.media.ev3dev import SoundFile, ImageFile
import socket

# This program requires LEGO EV3 MicroPython v2.0 or higher.
# Click "Open user guide" on the EV3 extension tab for more information.


# Create your objects here.
ev3 = EV3Brick()

def micropython_socket_test(url, port):
    s = socket.socket()

    ai = socket.getaddrinfo(url, port)
    # print("Address infos:", ai)
    addr = ai[0][-1]

    # print("Connect address:", addr)
    s.connect(addr)

    s.send(b"GET /api/v1/robot/hello HTTP/1.0\r\n\r\n")
    print(s.recv(4096))

    s.close()

# Write your program here.
if __name__ == '__main__':
    print("bongus")
    micropython_socket_test("example.com", 80)



