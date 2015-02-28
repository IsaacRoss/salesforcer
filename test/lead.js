/**
 * Created by Isaac on 2/27/2015.
 */
var Lead = require('../models/lead'),
    should = require('should');

describe('Lead: ', function () {
    describe('Default values', function () {
        var lead = {};
        before(function(){
            lead = new Lead({email: 'iross@taskstream.com'});
        });

        it('lead source is "Business Site Inquiry"', function(){
            lead.leadSource.should.equal('Business Site Inquiry');
        })
    });
});