const Airtable = require('airtable');

exports.handler = function(event, context, callback) {
  const data = JSON.parse(event.body);
  const { user } = data;

  var base = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_TOKEN }).base('app3RonGnLm3P4aVF');
  // currently PROD REPORTS BASE

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

  // field ids, airtable
  // from PROD REPORTS BASE
  let emailField = "fldDdJrgCAe1YD1xv";
  let advNameField = "fldI6KDv6htRgpemE";
  let orgNameField = "fld04CrtAkQn3CYmR"; // the column labeled 'for online form', just string

  // query airtable,
  // check for e-mail in approved partner list
  base('Advocates').select({
    fields: [emailField, advNameField, orgNameField], // PROD BASE - email, name, org name
    returnFieldsByFieldId: true
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
      console.log(record);
      let email = record.get(emailField); // PROD BASE - email address column, advocate table
      console.log(email);
      if (email.indexOf(user.email) > -1) {
        approval = true;
        console.log("MATCH, REQUEST APPROVED");
        responseBody.app_metadata.org = record.get(orgNameField); // PROD BASE - org name
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
