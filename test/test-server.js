// require chai
const chai = require('chai');
// require chaiHttp
const chaiHttp = require('chai-http');

// chai expect
const expect = chai.expect;

// require app, runServer, closeServer
const {app, runServer, closeServer} = require('../server');

// use chai
chai.use(chaiHttp);

describe('blog posts', function() {
	// before, runServer
	before(function() {
		return runServer();
	});

	// after, closeServer
	after(function() {
		return closeServer();
	});

	it('should list blogs on GET', function() {
		//return chai request
		return chai.request(app)
		.get('/blog-posts')
		.then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json
			expect(res.body).to.be.a('array')
			expect(res.body.length).to.be.above(0);
			res.body.forEach(function(blogPost) {
				expect(blogPost).to.be.a('object');
				expect(blogPost).to.have.all.keys(
					'id', 'title', 'content', 'author', 'publishDate')
			});
		});
	});

	it('should add blog post on POST', function() {
		const newPost = {
			title: 'I tried pilates for 30 days',
			content: 'Portland tilde mixtape, hell of normcore fingerstache quinoa seitan humblebrag live-edge tumblr.', 
			author: 'Elliot Smith'
		};

		const expectedKeys = ['id', 'publishDate'].concat(Object.keys(newPost));
		
		// return chai request
		return chai.request(app)
		.post('/blog-posts')
		.send(newPost)
		.then(function(res) {
			expect(res).to.have.status(201);
			expect(res).to.be.json;
			expect(res.body).to.be.a('object');
			expect(res.body).to.have.all.keys(expectedKeys);
			expect(res.body.title).to.equal(newPost.title);
			expect(res.body.content).to.equal(newPost.content);
			expect(res.body.author).to.equal(newPost.author)
		});
	});

	it('should update blog post on PUT', function() {
		// return chai request for get
		return chai.request(app)
		.get('/blog-posts')
		.then(function(res) {
			const updatePost = Object.assign(res.body[0], {
				name: 'I tried bullet journaling for 30 days',
				content: 'Umami church-key normcore freegan pok pok snackwave truffaut selvage artisan la croix.'
			});
			//return chai request for put
			return chai.request(app)
			.put(`/blog-posts/${res.body[0].id}`)
			.send(updatePost)
			.then(function(res) {
				expect(res).to.have.status(204)
			});
		});	
	});

	it('should delete blog post on DELETE', function() {
		//return chai request
		return chai.request(app)
		.get('/blog-posts')	
		.then(function(res) {
			return chai.request(app)
			.delete(`/blog-posts/${res.body[0].id}`)
			.then(function() {
				expect(res).to.have.status(200);
			});
		});
	});
	
});
