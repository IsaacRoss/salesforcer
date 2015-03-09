/**
 * Created by Isaac on 2/27/2015.
 */
(function () {
    'use strict';

    var Lead = require('../models/lead'),
        should = require('should');

    describe('Lead: ', function () {
        describe('Default values', function () {
            var lead = {};
            before(function () {
                lead = new Lead({Email: 'me@cool.com', Company: "My Company", LastName: "Last", newProp: 'TestMe'});
            });

            it('lead source is "Business Site Inquiry"', function () {
                lead.leadSource.should.equal('Business Site Inquiry');
            });

            it('creates lead with whatever fields are passed in', function(){
                lead.newProp.should.equal('TestMe');
            });
        });
    });
})();