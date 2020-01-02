import logging
from mongoengine import connect

from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.web import Application

from config.settings import settings
from handlers.base import BaseHandler
from router import routes
from scheduled.expiry_reminder import expiring_book_reminder


logging.basicConfig(level=logging.DEBUG)


class NotFoundHandler(BaseHandler):
    def prepare(self):
        self.set_status(404)
        self.finish({'message': 'Not Found'})


class App(Application):
    def __init__(self):
        Application.__init__(
            self,
            routes,
            default_handler_class=NotFoundHandler,
            **settings)
        connect(host=settings['mongodbUrl'])


def main():
    print('starting server...')

    app = App()
    server = HTTPServer(app)
    server.listen(settings['port'])
    print('listening to port', settings['port'])

    expiring_book_reminder.start()
    IOLoop.instance().start()


if __name__ == "__main__":
    main()
