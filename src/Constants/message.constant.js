// messages.js

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_NOCONTENT = 204;
const STATUS_NOTFOUND = 404;
const STATUS_ERROR = 500;
const MESSAGE_OK = 'API is working';
const MESSAGE_ERROR = 'Internal Server Error';
const MESSAGE_REGISTER = 'Registered Successfully';
const MESSAGE_FETCHED = 'Fetched Successfully';
const MESSAGE_UPDATED = 'Updated Successfully';
const MESSAGE_DELETED = 'Deleted Successfully';

module.exports = {
    STATUS_OK,
    STATUS_ERROR,
    MESSAGE_OK,
    MESSAGE_ERROR,
    STATUS_CREATED,
    STATUS_NOCONTENT,
    STATUS_NOTFOUND,
    MESSAGE_REGISTER,
    MESSAGE_FETCHED,
    MESSAGE_UPDATED,
    MESSAGE_DELETED
};