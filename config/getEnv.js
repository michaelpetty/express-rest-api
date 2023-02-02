require('dotenv').config()

if (process.env.NODE_ENV === 'test') {
    process.env.SQL_DB_NAME=process.env.TEST_SQL_DB_NAME
    process.env.SQL_DB_USER=process.env.TEST_SQL_DB_USER
    process.env.SQL_DB_PASS=process.env.TEST_SQL_DB_PASS
    process.env.SQL_DB_HOST=process.env.TEST_SQL_DB_HOST
    process.env.SQL_DB_DIALECT=process.env.TEST_SQL_DB_DIALECT
}