const Airtable = require('airtable');

exports.handler = function(event, context, callback) {
  const data = JSON.parse(event.body);
  const token = data.access_token;

  let decoded = jwt_decode(token);

  if (decoded.app_metadata.roles[0] == 'advocate') {
    var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appiZpVxsiS1Ev5Zv');
    // currently TEST: STAGING BASE 

    // query airtable, 
    // check for e-mail in approved partner list
    base('Partner organizations').select({
      fields: ["Report Form Logins", "Client List", "Name"]
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      records.forEach(function(record) {
        emails.push(record.get('Report Form Logins'));
      });

      // If there are no more records, `done` will get called.
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
      for (let i = 0; i < emails.length; i++) {
        if (emails[i].indexOf(user.email) > -1) {
          console.log("MATCH, REQUEST APPROVED");
          callback(null, loginResponse);
        } else {
          console.log("NO MATCH, REQUEST DENIED");
          callback(null, err)
        }
      }
    });

  } else {
    // ADD ERROR HANDLING, IF NOT ADVOCATE 
  }



};
