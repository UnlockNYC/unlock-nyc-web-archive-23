const Airtable = require('airtable');
const jwt_decode = require('jwt-decode');
const fetch = require('node-fetch');

exports.handler = function(event, context, callback) {
  const data = JSON.parse(event.body);
  const token = data.access_token;
  let decoded = jwt_decode(token);

  let columns = {
    listing: "fldhEdkPi8horzLD4",
    discriminationType: "fldp0Cdze4QBCRIQy",
    denialType: "fldZYKk8mQAJe05b5",
    aptAvailable: "fldLDDBMmULQ5gI1n",
    intervention: "fldHfhNDDz7Vgviec",
    evidence: "fld39iqRmYpy5M8j2",
    contact: "fld0KWctTTkkMxaRW"
  }
  /* NOTE: CHANGES based on env! staging base for now */
  // this is a list of columns with dropdown options
  // to send schema to populate form

  if (decoded.app_metadata.roles[0] == 'advocate') {
    // if they've been verified as advocate only
    var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appiZpVxsiS1Ev5Zv');
    // currently TEST: STAGING BASE 

    // query airtable, 
    // check for org in approved partner list
    let clientList = [];
    console.log(decoded.app_metadata.org);
    base('Partner organizations').select({
      maxRecords: 1,
      fields: ["Report Form Logins", "Client List", "Client List Names", "Name"],
      filterByFormula: `{Name}="${decoded.app_metadata.org}"`
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
      let schemaList = [];
      let schema = await getSchema();
      let fields = schema.tables[1].fields; // reports table
      for (let i = 0; i < fields.length; i++) {
        let column;
        let selectOptions;
        // check if any of the field IDs match
        // the columns object written @ top 
        // if so, add to array that we'll send to web form
        for (const key in columns) {
          if (columns[key] == fields[i].id) {
            column = fields[i].id;
            selectOptions = fields[i].options.choices;
            schemaList.push({ [column]: JSON.stringify(selectOptions) });
          }
        }
      }
      console.log(schemaList);
      console.log(clientList);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          clientList: clientList,
          schema: schemaList
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
        'Authorization': `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`
      }
    });
    const data = await response.json();
    return data;
  }
};
