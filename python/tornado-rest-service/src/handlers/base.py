import logging
from tornado.web import RequestHandler
from tornado.escape import json_decode

DEFAULT_CONTENT_TYPE = 'application/json'
logger = logging.getLogger('BaseHandler')


class BaseHandler(RequestHandler):
    def prepare(self):
        self.set_header('Content-Type', DEFAULT_CONTENT_TYPE)
        if (self.request
                .headers
                .get('Content-Type', '')
                .startswith(DEFAULT_CONTENT_TYPE)):
            try:
                self.request_body = json_decode(self.request.body)
            except ValueError:
                self.args = None
                self.set_status(422, 'Unprocessable Entity')
                self.finish()

    def write_error(self, status_code, **kwargs):
        reason = kwargs.get('reason')
        self.write({'status_code': status_code, 'reason': reason})
