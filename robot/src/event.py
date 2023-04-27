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

    @classmethod
    def parse_from_string(cls, input_string):
        event = cls.check_regex(EVENT_REGEX, input_string, 'message')
        data = cls.check_regex(DATA_REGEX, input_string, '')
        id = cls.check_regex(ID_REGEX, input_string, None)
        retry = cls.check_regex(RETRY_REGEX, input_string, None)

        return cls(event, data, id, retry)
    
    @staticmethod
    def check_regex(regex, input_string, default):
        match = re.search(regex, input_string)
        return match if match is not None else default


class EventSource:
    def __init__(self, host, path, port=80, read_size=1024):
        self.host = host
        self.port = port
        self.path = path
        
        self.dispatch_dict = {}
        self.READ_SIZE = read_size
        print("Initialized event source")
        #asyncio.create_task(self.event_loop())

    def add_event_listener(self, event_name, handler_function):
        self.dispatch_dict[event_name] = handler_function


    async def dispatch(self, event):
        action = self.dispatch_dict.get(event.event, id)
        action(event)


    async def event_loop(self):
        GET_STR = "GET {} HTTP/1.0\r\n\r\n".format(self.path)
        print("Event loop start")
        reader, writer = await asyncio.open_connection(self.host, self.port)
        print("Event loop connection established")
        writer.write(GET_STR.encode('utf-8'))
        
        while True:
            print("In event loop")
            buf = await reader.read(self.READ_SIZE)
            
            if buf != b'' and not buf.startswith(b':'):
                event = Event.parse_from_string(buf.decode('utf-8'))
                await self.dispatch(event)
