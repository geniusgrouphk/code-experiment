import logging

import jsonschema
from tornado.web import removeslash, HTTPError
from dateutil import parser as datetime_parser

from services import book_service
from handlers.base import BaseHandler
from schemas.requests.books import create_or_update_book_request_schema


logger = logging.getLogger('BooksHandler')


class BooksHandler(BaseHandler):
    @removeslash
    def get(self, book_id=None):
        if book_id:
            book = book_service.get(book_id)
            logger.debug('get book by id: %s %s', book_id, book)

            if book is not None:
                self.write(book.to_dict)
                return

            self.set_status(404)
            self.finish({'reason': 'book not found'})

            return

        page = int(self.get_query_argument('page', default=1))
        page_size = int(self.get_query_argument('page_size', default=20))
        books = book_service.get_default_list(page, page_size)
        count = book_service.count()

        logger.debug('books=%s', books)

        self.write({
            'data': books,
            'page_info': {
                'page': page,
                'page_size': page_size,
                'total': count
            }
        })

    # Add 1 book
    @removeslash
    def post(self, book_id=None):
        # FIXME: should avoid the mapping from routing
        if book_id:
            raise HTTPError(404)

        jsonschema.validate(
            instance=self.request_body,
            schema=create_or_update_book_request_schema,
            format_checker=jsonschema.FormatChecker()
        )
        book = book_service.create(
            title=self.request_body.get('title'),
            description=self.request_body.get('description'),
            expiry_date=datetime_parser.isoparse(
                self.request_body.get('expiry_date')),
            author=self.request_body.get('author'),
        )

        self.write(book.to_dict)

    @removeslash
    def patch(self, book_id):
        jsonschema.validate(
            instance=self.request_body,
            schema=create_or_update_book_request_schema,
            format_checker=jsonschema.FormatChecker()
        )

        updates = {
            key: self.request_body[key]
            for key in ['title', 'description', 'expiry_date', 'author']
        }

        book = book_service.update(book_id, updates)

        if book is not None:
            self.write(book.to_dict)
            return

        self.set_status(404)
        self.finish({'reason': 'book not found'})

    # Remove 1 book
    @removeslash
    def delete(self, book_id):
        res = book_service.delete(book_id)
        logger.debug('deleted count: %s', res)

        if res == 1:
            self.write({'message': 'done'})
            return

        self.set_status(404)
        self.finish({'reason': 'book not found'})
