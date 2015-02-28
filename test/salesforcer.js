/**
 * Created by Isaac on 2/27/2015.
 */
(function () {
    'use strict';

    var should = require('should'),
        SalesForcer = require('../index'),
        assert = require('assert'),
        sinon = require('sinon'),
        request = require('request');

    describe('Salesforcer: ', function () {
        describe('Valid Construction', function () {
            var sales = {};
            before(function () {
                sales = new SalesForcer({
                    clientId: 'myClientId',
                    clientSecret: 'clientSecret',
                    username: 'username',
                    password: 'password'
                });
            });

            it('has credentials', function () {
                sales.creds.should.not.equal(undefined);
            });

            it('defaults grant type to password', function () {
                sales.creds.grantType.should.equal('password');
            });

        });

        describe('Invalid Constructor', function () {
            function badConstructor() {
                return new SalesForcer();
            }

            it('throws when required fields are not passed in', function () {
                assert.throws(badConstructor, TypeError);
            });
        });
    });

    describe('Lead Creation', function () {
        var sales = {};
        before(function () {
            sales = new SalesForcer({
                clientId: 'myClientId',
                clientSecret: 'clientSecret',
                username: 'username',
                password: 'password'
            });
        });

        describe('Invalid Lead passed in', function () {
            function badLead() {
                sales.createLead({firstName: 'Isaac'});
            }

            it('does not allow leads without required fields', function () {
                assert.throws(badLead, Error);
            });
        });

        describe('Lead Gets Created', function () {
            var leadResult = {};
            before(function (done) {
                sinon
                    .stub(request, 'post')
                    .onCall(0).yields(null, {statusCode: 200}, JSON.stringify({
                        access_token: "ABCDEF",
                        instance_url: "http://ne.v3.com"
                    }))
                    .onCall(1).yields(null, {statusCode: 201}, JSON.stringify({
                        id: 2
                    }));
                sales.createLead({
                    email: 'me@bop.com',
                    firstName: 'TESTAPILEAD',
                    company: "My Test Company",
                    lastName: 'bop'
                }, function (err, result) {
                    leadResult = result;
                });
                done();
            });

            it('is successful', function () {
                leadResult.success.should.equal(true);
            });

            it('has message', function () {
                leadResult.message.should.equal('Lead Saved Successfully');
            });

            it('has lead information', function () {
                leadResult.lead.id.should.equal(2);
            });

            after(function () {
                request.post.restore();
            });
        });

        describe('Lead is Not Created', function () {
            var leadResult = {}, errResult = {};
            before(function (done) {
                sinon
                    .stub(request, 'post')
                    .onCall(0).yields(null, {statusCode: 200}, JSON.stringify({
                        access_token: "ABCDEF",
                        instance_url: "http://ne.v3.com"
                    }))
                    .onCall(1).yields(null, {statusCode: 400}, JSON.stringify({
                        message: 'Required fields are missing',
                        errorCode: "REQ"
                    }));
                sales.createLead({
                    email: 'me@bop.com',
                    firstName: 'TESTAPILEAD',
                    company: "My Test Company",
                    lastName: 'fredrick'
                }, function (err, result) {
                    leadResult = result;
                    errResult = err;
                });
                done();
            });
            it('is not successful', function () {
                leadResult.success.should.equal(false);
            });

            it('has a message', function () {
                leadResult.message.should.equal('Required fields are missing');
            });

            it('has full error', function () {
                errResult.message.should.equal('Required fields are missing');
                errResult.errorCode.should.equal('REQ');
            });

            after(function () {
                request.post.restore();
            });
        });

    });
})();