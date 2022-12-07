const Airtable = require('airtable');

exports.handler = function(event, context, callback) {
  const data = JSON.parse(event.body);
  const { user } = data;

  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appiZpVxsiS1Ev5Zv');
  // currently TEST: STAGING BASE 

  let emails = []
  const responseBody = {
    app_metadata: {
      roles: ["advocate"]
    }
  };

  let loginResponse = {
    statusCode: 200,
    body: JSON.stringify(responseBody)
  };

  console.log(user);
  console.log(user.email);

  base('Partner organizations').select({
    fields: ["Report Form Logins"]
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    records.forEach(function(record) {
      emails.push(record.get('Report Form Logins'));
      console.log(record.get('Report Form Logins'));
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();
  }, function done(err) {
    if (err) { console.error(err); return; }
    console.log(emails);
    for (let i = 0; i < emails.length; i++) {
      if (emails[i].indexOf(user.email) > -1) {
        console.log("MATCH");
        callback(null, loginResponse);
      } else {
        console.log("NO MATCH?")
        callback(null, err)
      }
    }
  });

};
