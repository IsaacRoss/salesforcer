## Salesforcer Lead Poster

This is a module for the purpose of saving leads to salesforce via the Rest API. _**This module only supports the
Session ID Authorization model**_.

You will need to obtain a clientId and a clientSecret. Please see documentation for more information.
[Salesforce Rest Api Documentation](https://www.salesforce.com/us/developer/docs/api_rest/)


```javascript
var SalesForcer = require('salesforcer');

var sales = new SalesForcer({
	clientId: 'clientId',
	clientSecret: 'clientSecret',
	username: 'username',
	password: 'password'
})

sales
    .createLead({
        Email: 'me@bop.com',
        FirstName: 'TESTAPILEAD',
        Company: "My Test Company",
        LastName: 'fredrick'
    }, function (err, result) {
        // do something with results
    });
```
createLead takes an object and tries to pass that off to the salesforce api. All object properties must be valid Lead properties in your system. 


## **Important**
##### Please make sure to read about the security token [here](https://www.salesforce.com/developer/docs/api/Content/sforce_api_concepts_security.htm)
Basically, you will have to append your security token to the end of your password.
It tripped me up for a while until I found this information buried in the docs.

from the docs:

###### _For access via the API or a client, users must add their security token (or time-based token if Two-Factor Authentication on API Logins is set on the user’s profile and the user has added a time-based token to his or her account) to the end of their password in order to log in._

A security token is an automatically-generated key from Salesforce. For example, if a user’s password is mypassword, and the security token is XXXXXXXXXX, **then the user must enter mypasswordXXXXXXXXXX to log in**. Or, some client applications have a separate field for the security token.
Users can obtain their security token by changing their password or resetting their security token via the Salesforce user interface. When a user changes their password or resets their security token, Salesforce sends a new security token to the email address on the user’s Salesforce record. The security token is valid until a user resets their security token, changes their password, or has their password reset.

