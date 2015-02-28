/**
 * Created by Isaac on 2/27/2015.
 */
var should = require('should'),
    SalesForcer = require('../index'),
    assert = require('assert');

describe('Salesforcer: ', function () {
    describe('Valid Construction', function () {
        var sales = {};
        before(function(){
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

        it('defaults grant type to password', function(){
            sales.creds.grantType.should.equal('password');
        })

    });

    describe('Invalid Constructor', function () {
        function badConstructor() {
            return new SalesForcer();
        }

        it('thows when required fields are not passed in', function () {
            assert.throws(badConstructor, TypeError);
        });
    });


});