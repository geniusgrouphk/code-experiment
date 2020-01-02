import logging

from tornado.websocket import WebSocketHandler, WebSocketClosedError

logger = logging.getLogger('ExpiringBooksWarningHandler')


class ExpiringBooksWarningHandler(WebSocketHandler):
    clients = []

    def open(self):
        print("New client connected")
        ExpiringBooksWarningHandler.clients.append(self)

    def on_message(self, message):
        # Not going to handle any incoming messages
        pass

    def on_close(self):
        self.callback.stop()
        ExpiringBooksWarningHandler.clients.remove(self)

    @classmethod
    def broadcast(cls, message):
        logger.debug('broadcasting...')
        for client in cls.clients:
            try:
                client.write_message(message)
            except WebSocketClosedError:
                ExpiringBooksWarningHandler.clients.remove(client)
