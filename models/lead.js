/**
 * Created by Isaac on 2/27/2015.
 */
var assert = require('assert'),
    extend = require('util')._extend;

var Lead = function (args) {
    var lead = {};
    assert.ok(args.Email, "Email is required");
    assert.ok(args.Company, "Company is required");
    assert.ok(args.LastName, "LastName is required");

    lead.leadSource = args.leadSource || "Business Site Inquiry";

    extend(lead, args);


    return lead;
};

module.exports = Lead;