const Airtable = require('airtable');
const jwt_decode = require('jwt-decode');
const fetch = require('node-fetch');

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
    base('Partner organizations').select({
      maxRecords: 1,
      fields: ["Report Form Logins", "Client List", "Client List Names", "Name"],
      filterByFormula: `"{Name}='${decoded.app_metadata.org}'"`
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        let names = record.get("Client List Names").split(",");
        let ids = record.get("Client List");
        for (i = 0; i < names.length; i++) {
          clientList.push({
            name: names[i],
            id: ids[i]
          });
        }
      });
      // If there are no more records, `done` will get called.
      fetchNextPage();
    }, async function done(err) {
      if (err) { console.error(err); return; }
      console.log(`${clientList.length} user records found.`);
      let schema = await getSchema();
      console.log(schema);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          clientList: clientList
        })
      });
    });

  } else {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        message: "error, not authorized"
      })
    });
  }

  async function getSchema() {
    console.log("running schema");
    const response = await fetch('https://api.airtable.com/v0/meta/bases/appiZpVxsiS1Ev5Zv/tables', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${provess.env.AIRTABLE_ACCESS_TOKEN}`
      }
    });
    const data = await response.json();
    return data;
  }
};
