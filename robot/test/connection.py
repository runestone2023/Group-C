import socket
from robot.src.event import EventSource, Event


def test_hello(url, port):
    print("hello")


def test_internet_connection():
    URL = "example.com"
    PORT = 80

    s = socket.socket()

    ai = socket.getaddrinfo(URL, PORT)
    addr = ai

    s.bind(('0.0.0.0', 8000))
    s.connect(addr)

    # get example.com's homepage
    s.send(b"GET / HTTP/1.0\r\n\r\n")

    print(s.recv(4096))

    s.close()
