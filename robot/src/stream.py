import asyncio
import re
import json

EVENT_REGEX = re.compile('event:(.*)\n')

# NOTE: This is not in line with specification, as data can contain newlines.
DATA_REGEX = re.compile('data:(.*)\n')

ID_REGEX = re.compile('id:([0-9])\n')
RETRY_REGEX = re.compile('retry:([0-9]*)\n')


class Event:
    def __init__(self, event='message', data='', id=None, retry=None):
        self.event = event
        self.data = data
        self.id = id
        self.retry = retry

    def parse_from_string(self, input_string):
        self.event = re.search(EVENT_REGEX, input_string).group(0)

        data = re.search(DATA_REGEX, input_string).group(0)
        self.data = None if data is None else json.loads(data)

        self.id = re.search(ID_REGEX, input_string).group(0)
        self.retry = re.search(RETRY_REGEX, input_string).group(0)


class EventSource:
    def __init__(self, url, port=80):
        # NOTE: This might need to be moved if reconnection-support is to be added
        self.reader, self.writer = asyncio.open_connection(url, port)

    def add_event_listener(self, event_type, handler_function):
        pass

    def __aiter__(self):
        self

    def __anext__(self):
        pass


# No async iteration, try another approach.
async def fetch_commands(endpoint_url: str, port=80):
    reader, writer = await asyncio.open_connection(endpoint_url, port)
    writer.write(b"GET /api/v1/robot/hellostream HTTP/1.0\r\n\r\n")

    while True:
        yield reader.read(4096)


async def main():
    async for command in fetch_commands("localhost", 8080):
        cmd = await command
        print(cmd)
        

if __name__ == '__main__':
    asyncio.run(main())
    #micropython_socket_test("127.0.0.1", 8080)
