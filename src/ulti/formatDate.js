
/** @format */
const dateFormat = require('moment');
require('moment/locale/vi');

export default {
    formatDate: (date) => dateFormat(date).format('DD/MM/YYYY'),
}