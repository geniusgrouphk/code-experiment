create_or_update_book_request_schema = {
    "type": "object",
    "properties": {
        "title": {
            "type": "string",
            "minLength": 1
        },
        "description": {
            "type": "string",
            "maxLength": 300
        },
        "expiry_date": {
            "type": "string",
            "format": "date-time"
        },
        "author": {
            "type": "string"
        }
    },
    "required": [
        "title"
    ],
}
