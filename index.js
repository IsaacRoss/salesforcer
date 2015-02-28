/**
 * Created by Isaac on 2/27/2015.
 */
var assert = require('assert'),
    Creator = require('./lib/creator'),
    Lead = require('./models/lead');

var SalesForcer = function (creds) {
    var self = this;
    assert.ok(creds.clientId, "You must provide a clientId");
    assert.ok(creds.clientSecret, "You must provide a clientSecret");
    assert.ok(creds.username, "You must provide a username");
    assert.ok(creds.password, "You must provide a passsword");
    creds.grantType = creds.grantType || 'password';
    self.creds = creds;


    self.createLead = function (lead, next) {
        var creator = new Creator();
        lead = new Lead(lead);
        creator.createLead(creds, lead, next);
    };
};

module.exports = SalesForcer;