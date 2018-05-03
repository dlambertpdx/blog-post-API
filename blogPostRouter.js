const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create('First Blog Post', 'This is my first blog post', 'by Me');
BlogPosts.create('Another Blog Post', 'This is a less interesting blog post', 'by Me');


router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author'];
	for(let i = 0; i < requiredFields.length; i += 1) {
		const field = requiredFields[i];
		if(!(field in req.body)) {
			const message = `Missing \'${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
	req.status(201).json(item);
});

router.delete('./:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`Deleted blog post \`${req.params.id}\``);
	res.status(204).end();
});