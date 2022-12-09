const Airtable = require('airtable');
const jwt_decode = require('jwt-decode');

exports.handler = function(event, context, callback) {
  const data = JSON.parse(event.body);
  const token = data.access_token;
  let decoded = jwt_decode(token);

  if (decoded.app_metadata.roles[0] == 'advocate') {
    // if they've been verified as advocate only
    var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appiZpVxsiS1Ev5Zv');
    // currently TEST: STAGING BASE 

    // query airtable, 
    // check for org in approved partner list
    let clientList = [];
    let clientInfo = [];
    base('Partner organizations').select({
      maxRecords: 1,
      fields: ["Report Form Logins", "Client List", "Name"],
      filterByFormula: `"{Name}='${decoded.app_metadata.org}'"`
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      records.forEach(function(record) {
        let clients = record.get("Client List");
        clientList = clients;
      });
      // If there are no more records, `done` will get called.
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
      for (i = 0; i < clientList.length; i++) {
        base('User information').find(clientList[i], function(err, record) {
          if (err) { console.error(err); return; }
          clientInfo.push(record.get("Name"));
          if (i == clientList.length - 1) {
            console.log(clientInfo);
            callback(null, {
              statusCode: 200,
              body: JSON.stringify({ clientList: clientList.join(",") })
            });
          }
        });
      }

    });


  } else {
    // ADD ERROR HANDLING, IF NOT ADVOCATE 
  }

};
