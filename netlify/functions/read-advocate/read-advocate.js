const Airtable = require('airtable');

exports.handler = function(event, context, callback) {
  const data = JSON.parse(event.body);
  const token = data.access_token;
  let decoded = jwt_decode(token);

  let responseBody = {
    clientList: ""
  }

  if (decoded.app_metadata.roles[0] == 'advocate') {
    var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appiZpVxsiS1Ev5Zv');
    // currently TEST: STAGING BASE 

    // query airtable, 
    // check for e-mail in approved partner list
    base('Partner organizations').select({
      maxRecords: 1,
      fields: ["Report Form Logins", "Client List", "Name"],
      filterByFormala: `{Name}='${decoded.app_metadata.org}'`
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      records.forEach(function(record) {
        console.log(record)
        responseBody.clientList = record.get("Client List");
      });

      // If there are no more records, `done` will get called.
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(responseBody)
      });
    });

  } else {
    // ADD ERROR HANDLING, IF NOT ADVOCATE 
  }



};
