from src.event import EventSource
import asyncio
# from src.movement import move, beep, hello
# from src.patrol import patrol


def hello(event):
    print("Hello\n")
    pass


def main():
    es = EventSource('127.0.0.1', '/api/v1/robot/command', 8080)
    es.add_event_listener('Hello', hello)
    # es.add_event_listener('Beep', beep)
    # es.add_event_listener('Move', move)
    # es.add_event_listener('Patrol', patrol)

    loop = asyncio.get_event_loop()
    loop.run_forever()


# Write your program here.
if __name__ == '__main__':
    print("Starting robot...")
    main()
