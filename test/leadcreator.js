/**
 * Created by isaacross on 2/27/15.
 */
(function () {
    'use strict';

    var should = require('should'),
        request = require('request'),
        sinon = require('sinon'),
        Creator = require('../lib/creator');

    describe('Credentials and lead are valid', function () {
        var callSpy;
        var leadResult = {};
        before(function (done) {

            callSpy = sinon
                .stub(request, 'post')
                .onCall(0).yields(null, {statusCode: 200}, JSON.stringify({
                    access_token: "ABCDEF",
                    instance_url: "http://ne.v3.com"
                }))
                .onCall(1).yields(null, {statusCode: 200}, JSON.stringify({
                    id: 2
                }));
            var creator = new Creator();
            creator.createLead({
                clientId: 'dod',
                grantType: 'password',
                clientSecret: 'dddd',
                username: 'dd',
                password: 'ddd'
            }, {email: 'iross@taskstream.com'}, function (err, result) {
                leadResult = result;
            });
            done();
        });
        it('is successful', function () {
            leadResult.success.should.equal(true);
        });
        it('sets a message of success', function () {
            leadResult.message.should.equal("Lead Saved Successfully");
        });

        it('creates a valid url from instanceurl', function () {
            leadResult.options.url.should.equal("http://ne.v3.com/services/data/v20.0/sobjects/Lead");
        });

        it('creates a token', function () {
            leadResult.token.should.equal("ABCDEF");
        });

        it('sets the id of the lead', function () {
            leadResult.lead.id.should.equal(2);
        });

        it('makes all expected calls', function () {
            callSpy.stub.callCount.should.equal(2);
        });

        after(function (done) {
            request.post.restore();
            done();
        });
    });

    describe('call to get token is invalid', function () {
        var callSpy;
        var leadResult = {};
        var errResult = {};
        before(function (done) {

            callSpy = sinon
                .stub(request, 'post')
                .onCall(0).yields(null, {statusCode: 400}, JSON.stringify({
                    error_description: 'invalid client credentials',
                    error: 'invalid_client'
                }))
                .onCall(1).yields(null, {statusCode: 200}, JSON.stringify({
                    id: 2
                }));
            var creator = new Creator();
            creator.createLead({
                clientId: 'dod',
                grantType: 'password',
                clientSecret: 'dddd',
                username: 'dd',
                password: 'ddd'
            }, {}, function (err, result) {
                errResult = err;
                leadResult = result;
            });
            done();
        });

        it('never calls through to create lead', function () {
            callSpy.stub.callCount.should.equal(1);
        });

        it('sets error to error description', function () {
            errResult.error_description.should.equal('invalid client credentials');
        });

        after(function (done) {
            request.post.restore();
            done();
        });
    });
})();
