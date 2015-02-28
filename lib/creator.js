/**
 * Created by Isaac on 2/27/2015.
 */

var request = require('request'),
    assert = require('assert'),
    EventEmitter = require('events').EventEmitter,
    util = require('util');

var CreateResult = function () {
    var result = {
        success: false,
        message: null,
        instanceUrl: null,
        token: null,
        options: {},
        lead: {}
    };
    return result;
};

var Creator = function () {
    var self = this;
    var continueWith = null;
    EventEmitter.call(self);


    var buildHeaders = function (cResult) {
        cResult.options = {
            url: cResult.instanceUrl + '/services/data/v20.0/sobjects/Lead',
            headers: {
                "Authorization": "Bearer " + cResult.token
            }
        };
        self.emit('headers-built', cResult);
    };

    var postLead = function (cResult) {
        var lead = cResult.lead;
        request.post(cResult.options.url, {
            headers: {
                "Authorization": "Bearer " + cResult.token
            },
            json: {
                "Email": lead.email,
                "FirstName": lead.firstName,
                "LastName": lead.lastName,
                "Company": lead.company,
                "LeadSource": lead.leadSource
            }
        }, function (err, res, body) {
            if (res.statusCode !== 200 && res.statusCode !== 201) {
                var bod = JSON.parse(body);
                cResult.success = false;
                cResult.message = bod.message || 'Something Went Wrong';

                return continueWith(bod, cResult);
            }
            if (err) {
                return continueWith(err, null);
            }
            cResult.success = true;
            cResult.message = "Lead Saved Successfully";
            cResult.lead.id = JSON.parse(body).id;

            continueWith(null, cResult);
        });
    };

    var getToken = function (url, creds, next) {
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
            }, function (err, httpResponse, body) {
                var raw,
                    createResult;
                if (err) {
                    return next(err);
                }
                if (httpResponse.statusCode !== 200) {
                    return next(JSON.parse(body));
                }
                raw = JSON.parse(body);
                createResult = new CreateResult();
                createResult.instanceUrl = raw.instance_url;
                createResult.token = raw.access_token;

                return next(null, createResult);
            });
    };


    self.on('token-recieved', buildHeaders);
    self.on('headers-built', postLead);


    self.createLead = function (creds, lead, next) {
        getToken("https://login.salesforce.com/services/oauth2/token", creds, function (err, response) {
            if (err) {
                self.emit('auth-failure', err);
                return next(err, null);
            }
            response.lead = lead;
            continueWith = next;
            self.emit('token-recieved', response);
        });
    };

};
util.inherits(Creator, EventEmitter);
module.exports = Creator;