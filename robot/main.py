from src.event import EventSource
from src.movement import move, beep
from src.patrol import patrol

import uasyncio

def main():
    es = EventSource('127.0.0.1', '/api/v1/robot/hello', 8080)
    es.add_event_listener('Beep', beep)
    es.add_event_listener('Move', move)
    es.add_event_listener('Patrol', patrol)

    loop = uasyncio.get_event_loop()
    loop.create_task()
    loop.run_forever()


# Write your program here.
if __name__ == '__main__':
    print("Starting robot...")
    main()
    
