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

def micropython_socket_test():
    s = socket.socket()
    print(dir(socket))

    ai = socket.getaddrinfo("google.com", 80)
    print("Address infos:", ai)
    addr = ai[0][-1]

    print("Connect address:", addr)
    s.connect(addr)

    s.send(b"GET / HTTP/1.0\r\n\r\n")
    print(s.recv(4096))

    s.close()

def http_get(url):
    _, _, host, path = url.split('/', 3)
    addr = socket.getaddrinfo(host, 80)[0][-1]
    print(addr)
    s = socket.socket()
    s.connect(addr)
    print('Can connect')
    s.send(bytes('GET /%s HTTP/1.0\r\nHost: %s\r\n\r\n' % (path, host), 'utf8'))
    while True:
        data = s.recv(100)
        if data:
            #print(str(data, 'utf8'), end='')
            ev3.screen.draw_text(40, 50, str(data, 'utf8'))

        else:
            break
    s.close()

def get_test():
    headers = """GET / HTTP/1.1\r\n
    Host: google.com\r\n\r\n"""
    host = "93.184.216.34" #proxy server IP
    port = 80              #proxy server port

    try:
        s = socket.socket()
        s.connect((host, port))
        s.send(("CONNECT {0}:{1} HTTP/1.1\r\n" + "Host: {2}:    {3}\r\n\r\n").format(socket.gethostbyname(socket.gethostname()), 1000, port, host))
        print(s.recv(1096))
        s.send(headers)
        response = s.recv(1096)
        print(response)
        s.close()
    except socket.error as m:
       print(str(m))
       s.close()

# Write your program here.
for i in range(5):
    micropython_socket_test()
    #http_get("https://www.example.com/")
    #get_test()
    wait(500)



