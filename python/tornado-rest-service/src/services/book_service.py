import logging
from datetime import datetime, timedelta

from repositories import book_repository
from models.Book import Book


logger = logging.getLogger('book_service')


def create(title, description, expiry_date, author):
    book = Book(title=title, description=description, expiry_date=expiry_date, author=author)
    return book_repository.create(book)


def get(book_id):
    return book_repository.find_by_id(book_id)


def get_default_list(page, page_size):
    return book_repository.find({}, page, page_size)


def count(criteria=None):
    return book_repository.count(criteria)


def update(book_id, updates):
    return book_repository.update(book_id, updates)


# soft delete
def delete(book_id):
    return book_repository.delete(book_id)


def find(criteria):
    return book_repository.find(criteria)


def find_expiring_books(expiry_limit=None):
    expire_time = datetime.utcnow() + timedelta(minutes=expiry_limit)
    books = book_repository.find(
        criteria={'expiry_date__lte': expire_time}
    )
    return books
