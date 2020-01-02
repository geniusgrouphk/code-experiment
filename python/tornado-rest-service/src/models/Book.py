from datetime import datetime
from mongoengine import BooleanField, DateTimeField, Document, StringField


class Book(Document):
    title = StringField(required=True)
    description = StringField()
    expiry_date = DateTimeField()
    author = StringField()
    created_at = DateTimeField(required=True, default=datetime.utcnow())
    updated_at = DateTimeField()
    is_deleted = BooleanField(deafult=False)

    meta = {
        'indexes': [
            {'fields': ['expiry_date'], 'sparse': True}
        ]
    }

    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
        return super(Book, self).save(*args, **kwargs)

    @property
    def to_dict(self):
        return {
            'id': str(self.id),
            'title': self.title,
            'description': self.description,
            'expiry_date': self.expiry_date.isoformat(),
            'author': self.author
        }
