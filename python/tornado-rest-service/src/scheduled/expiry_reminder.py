import logging

from tornado.ioloop import PeriodicCallback

from handlers.expiring_books_warning import ExpiringBooksWarningHandler
from services import book_service

logger = logging.getLogger('expiry_reminder')


def log_expiring_books(limit=15):
    books = book_service.find_expiring_books(limit)
    if len(books) > 0:
        message = 'ID of books to be expired in {} minutes: {}'.format(
            limit,
            books)

        logger.warning(message)
        ExpiringBooksWarningHandler.broadcast(message)
    else:
        message = 'no books are found expiring within {}  minutes'.format(
            limit
        )
        logger.info(message)
        ExpiringBooksWarningHandler.broadcast(message)


expiring_book_reminder = PeriodicCallback(log_expiring_books, 60000)
