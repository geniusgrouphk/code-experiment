from unittest import mock

from services import book_service


@mock.patch('repositories.book_repository.create')
def test_create(mocked_create):
    assert book_service.create(
        'title',
        'description',
        'expiry_date') == mocked_create.return_value


@mock.patch('repositories.book_repository.find_by_id')
def test_get(mocked_find_by_id):
    assert book_service.get(None) == mocked_find_by_id.return_value


@mock.patch('repositories.book_repository.find')
def test_get_default_list(mocked_find):
    page = 0
    page_size = 0
    assert book_service.get_default_list(
        page, page_size) == mocked_find.return_value
    mocked_find.assert_called_once_with({}, page, page_size)


@mock.patch('repositories.book_repository.update')
def test_update(mocked_update):
    book_id = ''
    updates = {}
    assert book_service.update(book_id, updates) == mocked_update.return_value


@mock.patch('repositories.book_repository.delete')
def test_delete(mocked_delete):
    book_id = ''
    assert book_service.delete(book_id) == mocked_delete.return_value


@mock.patch('repositories.book_repository.find')
def test_find(mocked_find):
    criteria = {}
    assert book_service.find(criteria) == mocked_find.return_value
