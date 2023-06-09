import uasyncio
import re
import json

EVENT_REGEX = re.compile('event:(.*?)\n')

# NOTE: This is not in line with specification, as data can contain newlines.
DATA_REGEX = re.compile('data:(.*?)\n')

ID_REGEX = re.compile('id:([0-9]*?)\n')
RETRY_REGEX = re.compile('retry:([0-9]*?)\n')


class Event:
    def __init__(self, event='message', data='', id=None, retry=None):
        self.event = event
        self.data = data
        self.id = id
        self.retry = retry

    def __repr__(self):
        return "{}({}, {}, {}, {})".format(self.__class__.__name__, self.event, self.data, self.id, self.retry)

    @classmethod
    def parse_from_string(cls, input_string):
        event = cls.check_regex(EVENT_REGEX, input_string, 'message')
        data = cls.check_regex(DATA_REGEX, input_string, '')
        id = cls.check_regex(ID_REGEX, input_string, None)
        retry = cls.check_regex(RETRY_REGEX, input_string, None)

        return cls(event, data, id, retry)

    @staticmethod
    def check_regex(regex, input_string, default):
        match = regex.search(input_string)
        return match.group(1) if match is not None else default

    
    @property
    def json(self):
        """Returns the data of the event as a dict, assuming that it is valid json."""
        return json.loads(self.data)


class EventSource:
    def __init__(self, host, path, port=80, read_size=1024):
        self.host = host
        self.port = port
        self.path = path

        self.dispatch_dict = {}
        self.READ_SIZE = read_size
        self.loop = uasyncio.get_event_loop()
        # FIXME: Try to move to actual logging library.
        print("Initialized event source.")

        self.loop.create_task(self.event_loop())

    def add_event_listener(self, event_name, handler_function):
        self.dispatch_dict[event_name] = handler_function

    def dispatch(self, event):
        try: 
            print(event.event)
            action = self.dispatch_dict[event.event]
            self.loop.create_task(action(event))
        except KeyError as e:
            # FIXME: Try to move to actual logging library.
            print(e)


    async def event_loop(self):
        GET_STR = "GET {} HTTP/1.0\r\n\r\n".format(self.path)
        print(GET_STR.encode('utf-8'))
        reader, writer = await uasyncio.open_connection(self.host, self.port)
        # FIXME: Try to move to actual logging library.
        print("Connection to server established.")
        await writer.awrite(GET_STR.encode('utf-8'))

        while True:
            buf = await reader.read(self.READ_SIZE)

            if buf != b'' and not buf.startswith(b':'):
                print(buf)
                event = Event.parse_from_string(buf.decode('utf-8'))
                print(event)
                self.dispatch(event)
