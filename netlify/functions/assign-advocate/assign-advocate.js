const Airtable = require('airtable');

exports.handler = function(event, context, callback) {
  const data = JSON.parse(event.body);
  const { user } = data;

  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appiZpVxsiS1Ev5Zv');
  // currently TEST: STAGING BASE 

  let approval = false;

  const responseBody = {
    app_metadata: {
      roles: ["advocate"],
      org: ""
    }
  };

  let loginResponse = {
    statusCode: 200,
    body: ""
  };

  // query airtable, 
  // check for e-mail in approved partner list
  base('Partner organizations').select({
    fields: ["Report Form Logins", "Name"]
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    records.forEach(function(record) {
      let email = record.get("Report Form Logins");
      if (email.indexOf(user.email) > -1) {
        approval = true;
        console.log("MATCH, REQUEST APPROVED");
        responseBody.app_metadata.org = record.get("Name");
      }
    });
    // If there are no more records, `done` will get called.
    fetchNextPage();
  }, function done(err) {
    if (err) { console.error(err); return; }
    if (approval) {
      loginResponse.body = JSON.stringify(responseBody);
      callback(null, loginResponse);
    } else {
      console.log("NO MATCH, REQUEST DENIED");
      callback(null, err)
    }

  });

};
