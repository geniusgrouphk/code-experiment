from tornado.web import RequestHandler


class MessageBoardHandler(RequestHandler):
    def get(self):
        self.render('message_board.html')
