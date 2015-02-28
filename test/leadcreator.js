/**
 * Created by isaacross on 2/27/15.
 */
var should = require('should'),
    request = require('request'),
    sinon = require('sinon'),
    Creator = require('../lib/creator');

describe('Credentials are valid', function(){
    var callSpy;

    before(function(done){

        callSpy = sinon
            .stub(request, 'post')
            .onCall(0).yields(null, null, JSON.stringify({
                access_token: "ABCDEF",
                instance_url: "http://ne.v3.com"
            }))
            .onCall(1).yields({
                id: 2
            });
        done();
    });

    it('does the bizness', function(){

        var creator = new Creator();
        creator.createLead({
            clientId: 'dod',
            grantType: 'password',
            clientSecret: 'dddd',
            username: 'dd',
            password: 'ddd'
        });
        callSpy.stub.calledTwice.should.be.true;
    });



    after(function(done){
        request.post.restore();
        done();
    })
});