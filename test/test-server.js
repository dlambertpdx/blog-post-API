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
		return chai.request(app);
		.get('/blog-posts')
		.then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json
			expect(res.body).to.be.a('array')
			expect(res.body.length).to.be.above(0);
			res.body.forEach(function(blogPost) {
				expect(blogPost).to.be.a('object');
				expect(blogPost).to.have.all.keys(
					'id', 'title', 'content', 'author')
			});
		})
	});
});
