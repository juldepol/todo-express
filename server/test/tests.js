const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const app = require('../index');
chai.use(chaiHttp);

let req = {
    body: {},
};

let res = {
    sendCalledWith: '',
    send: function(arg) { 
        this.sendCalledWith = arg;
    }
};

describe('GET /', function() {
    it('1 Not found', function() {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.status.should.be.equal(404);
            });
    });
});

describe('GET /api/task', function() {
    it('2 Should return array', function() {
        chai.request(app)
            .get('/api/task')
            .end((err, res) => {
                res.status.should.be.equal(200);
                should.exist(res.body);
                res.body.should.be.a('array');
                res.should.be.json;
            });
    });
});

describe('POST /api/task', function() {
    it('3 Status should be equal to 201', function() {
        chai.request(app)
            .post('/api/task')
            .set('content-type', 'application/json')
            .send({task: 'test'})
            .end((err, res) => {
                res.status.should.be.equal(201);
                res.should.be.json;
            });
    });
});

describe('4 DELETE /api/task', function() {
    it('Status should be equal to 500', function() {
        chai.request(app)
            .delete('/api/task')
            .end((err, res) => {
                res.status.should.be.equal(500);
                res.should.be.json;
            });
    });

    it('5 Status should be equal to 200', function() {
        chai.request(app)
            .delete('/api/task?id=5')
            .end((err, res) => {
                res.status.should.be.equal(200);
                res.should.be.json;
            });
    });
});

describe('PUT /api/task', function() {
    it('6 sStatus should be equal to 200', function() {
        chai.request(app)
            .put('/api/task?id=7')
            .end((err, res) => {
                res.status.should.be.equal(200);
                res.should.be.json;
            });
    });
});