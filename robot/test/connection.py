#!/usr/bin/env pybricks-micropython

import sys
sys.path.append('/home/robot/robot/src/')

import socket
import uasyncio

from event import Event, EventSource


def test_hello():
    # Establish connection to API
    es = EventSource('192.168.1.82', '/api/v1/robot/hello', 8080)

    # This will add a function that will be run when 'Hello' is received from server
    es.add_event_listener('Hello', echo_handler)
    loop = uasyncio.get_event_loop()
    loop.create_task(hello_heartbeat())


def echo_handler(event):
    print('Event: {}, Data: {}'.format(event.event, event.data))


async def hello_heartbeat():
    # For testing that async works concurrently as it should
    while True:
        print("Hello")
        await uasyncio.sleep(2)


def test_internet_connection():
    # Test if the EV3 can connect to internet

    URL = "example.com"
    PORT = 80

    s = socket.socket()

    ai = socket.getaddrinfo(URL, PORT)
    addr = ai[0][-1]

    s.bind(('0.0.0.0', 8000))
    s.connect(addr)

    # get example.com's homepage
    s.send(b"GET / HTTP/1.0\r\n\r\n")

    print(s.recv(4096))

    s.close()


def main():
    test_internet_connection()

    loop = uasyncio.get_event_loop()
    test_hello()
    loop.run_forever()

if __name__ == '__main__':
    main()