/**
 * Created by isaacross on 2/27/15.
 */
var should = require('should'),
    request = require('request'),
    sinon = require('sinon'),
    Creator = require('../lib/creator');

describe('Credentials are valid', function(){

    before(function(done){
        sinon
            .stub(request, 'get')
            .yields(null, null, 'fucking shit')

        sinon
            .stub(request, 'post')
            .yields(null, null, JSON.stringify({
                access_token: "ABCDEF",
                instance_url: "http://ne.v3.com"
            }));
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
        })
    });



    after(function(done){
        request.get.restore();
        request.post.restore();
        done();
    })
});