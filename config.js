'use strict'

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongods://localhost/blog-app';
exports.PORT = process.env.PORT || 8080;