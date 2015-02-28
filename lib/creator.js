/**
 * Created by Isaac on 2/27/2015.
 */

var request = require('request'),
    assert = require('assert'),
    EventEmitter = require('events').EventEmitter,
    util = require('util');

var CreateResult = function(){
    var result = {
        success: false,
        message: null,
        instanceUrl: null,
        token: null,
        options: {},
        lead:{}
    };
    return result;
};

var Creator = function(){
    var self = this;
    EventEmitter.call(self);

    var buildHeaders = function(cResult){
        cResult.options = {
            url: cResult.instanceUrl + '/services/data/v20.0/sobjects/Lead',
            headers: {
                "Authorization": "Bearer " + cResult.token
            }
        };
        self.emit('headers-built', cResult);
    };

    var getSome = function(cResult){
        request.get(cResult.options, function(err, r, b){
            console.log(b);
        });
    };

    var getToken = function(url, creds, next){
        request
            .post({
                url: url,
                form: {
                    grant_type: creds.grantType,
                    client_id: creds.clientId,
                    client_secret: creds.clientSecret,
                    username: creds.username,
                    password: creds.password
                }
            }, function(err, httpResponse, body){
                var raw,
                    createResult;
                if(err){
                    return next(err);
                }
                raw = JSON.parse(body);
                createResult = new CreateResult();
                createResult.instanceUrl = raw.instance_url;
                createResult.token = raw.access_token;

                return next(null, createResult);
            })
    };


    self.on('token-recieved', buildHeaders);
    self.on('headers-built', getSome);


    self.createLead = function(creds, lead, next){
        getToken("https://login.salesforce.com/services/oauth2/token", creds, function(err, response){
            response.lead = lead;
            self.emit('token-recieved', response);
        });
    }

};
util.inherits(Creator, EventEmitter);
module.exports = Creator;