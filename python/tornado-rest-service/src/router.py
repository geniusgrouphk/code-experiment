from handlers.book_handler import BooksHandler
from handlers.expiring_books_warning import ExpiringBooksWarningHandler
from handlers.message_board_handler import MessageBoardHandler

routes = [
    (r"/books/?$", BooksHandler),
    # TODO centralize validation in handler
    (r"/books/([0-9a-f]{24})", BooksHandler),
    (r"/subscribe", ExpiringBooksWarningHandler),
    (r"/message-board", MessageBoardHandler),
]
