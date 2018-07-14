//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let capacity = require('../dist/capacity');
let server = require('../dist');


chai.use(chaiHttp);
/*
  * Test the /GET route
  */
describe('/GET /api/capacity/get_interfaces_config', () => {

    it('it should get 404 error', (done) => {
      chai.request(server)
          .get('/api/capacity/get_interfaces_config/')
          .end((err, res) => {
              let should = chai.should();
              res.should.have.status(404);
              //res.body.should.be.a('object');
              //res.body.length.should.be.eql(0);
            done();
          });
    });
});
