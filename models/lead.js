/**
 * Created by Isaac on 2/27/2015.
 */
var assert = require('assert');

var Lead = function(args){
    assert.ok(args.email, "Email is required");

    var lead = {};
    lead.leadSource = args.leadSource || "Business Site Inquiry";
    lead.firstName = args.firstName || '';
    lead.lastName = args.lastName || '';
    lead.email = args.email;
    lead.phone = args.phone || 'No Phone';
    lead.company = args.company || 'No Company';
    lead.institution = args.institution;
    lead.country = args.country || 'USA';
    lead.state = args.state || '';
    lead.comments = args.comments || '';

    return lead;
};

module.exports = Lead;