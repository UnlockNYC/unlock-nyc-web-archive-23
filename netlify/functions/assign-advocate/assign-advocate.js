const Airtable = require('airtable');

exports.handler = async function(event, context, callback) {
  const data = JSON.parse(event.body);
  const { user } = data;

  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appiZpVxsiS1Ev5Zv');
  // currently TEST: STAGING BASE 

  let emails = []
  let loginResponse;

  const responseBody = {
    app_metadata: {
      roles: ["advocate"]
    }
  };

  console.log(user);

  let recordSearch = await base('Partner organizations').select({
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
    checkEmails();
  });

  function checkEmails() {
    approved = False;
    for (i = 0; i < emails.length; i++) {
      if (emails[i].indexOf(user.user_metadata.email) > -1) {
        approved = True;
        loginResponse = {
          statusCode: 200,
          body: JSON.stringify(responseBody)
        }
        break;
      }
    }
    if (approved == False) {
      loginResponse = {
        statusCode: 500,
        body: null
      }
    }
    callback(null, loginResponse);
  }
};
