from src.stream import fetch_commands, Event
from src.movement import move, hello, beep
from src.patrol import patrol

from test.connection import test_hello, test_internet_connection

ROBOT_ACTIONS = {"Move": move, "Hello": hello, "Beep": beep, "Patrol": patrol}

def hello_handler(event):
    print('Event: {}, Data: {}'.format(event.event, event.data))

async def main():
    async for command in fetch_commands("localhost", 8080):
        cmd = await command
        print(cmd)

        new_event = Event()
        todo = new_event.parse_from_string(cmd)

        if todo.data is None:
            ROBOT_ACTIONS[todo.event]()
        else:
            ROBOT_ACTIONS[todo.event](todo.data)


# Write your program here.
if __name__ == '__main__':
    print("Starting...")
    test_internet_connection()
    test_hello("localhost", 8080)

