#!/usr/bin/env pybricks-micropython
from pybricks.hubs import EV3Brick
from pybricks.ev3devices import (Motor, TouchSensor, ColorSensor,
                                 InfraredSensor, UltrasonicSensor, GyroSensor)
from pybricks.parameters import Port, Stop, Direction, Button, Color
from pybricks.tools import wait, StopWatch, DataLog
from pybricks.robotics import DriveBase
from pybricks.media.ev3dev import SoundFile, ImageFile

# Create your objects here.
ev3 = EV3Brick()


def hello(event):
    print("Hello\n")
    pass


def beep(event):
    print("Beep\n")
    pass


def move(event):
    print("Move\n")
    print(event.data.get("argument"))
    pass


def rotate(event):
    print("Rotate\n")
    print(event.data.get("argument"))
    pass
