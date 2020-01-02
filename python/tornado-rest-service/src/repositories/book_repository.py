import logging

from models.Book import Book

logger = logging.getLogger('book_repository')


def create(book):
    return book.save()


def find(criteria, page=1, page_size=20):
    books = (
        Book
        .objects(**criteria, is_deleted__ne=True)
        .skip((page - 1) * page_size)
        .limit(page_size)
        .fields(id=1,
                title=1,
                description=1,
                expiry_date=1,
                author=1)
    )
    return list(map(lambda t: t.to_dict, books))


def count(criteria=None):
    return (
        Book
        .objects(
            **criteria if criteria is not None else {},
            is_deleted__ne=True)
        .count()
    )


def find_by_id(book_id):
    return Book.objects(id=book_id, is_deleted__ne=True).first()


def update(book_id, updates):
    return Book.objects(id=book_id).modify(new=True, **updates)


def delete(book_id):
    return Book.objects(id=book_id).update_one(is_deleted=True)
