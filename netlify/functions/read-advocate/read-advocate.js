const Airtable = require('airtable');
const jwt_decode = require('jwt-decode');
const fetch = require('node-fetch');

exports.handler = function(event, context, callback) {
  const data = JSON.parse(event.body);
  const token = data.access_token;
  let decoded = jwt_decode(token);

  let columns = {
    listing: "fld2wcMYdBLqC8Qze",
    discriminationType: "fldaSBFI9xkDNqNMI",
    denialType: "fldKQJMhhj4Lpza7f",
    aptAvailable: "fld3LQiU1MEcyqADh",
    intervention: "flds7gfMy2BXr4nam",
    evidence: "fldO1hS0hrTAgldfc",
    contact: "fldkit1voLUsvQ3Im"
  }
  /* NOTE: CHANGES based on env! THIS IS PROD REPORTS BASE */
  // this is a list of columns with dropdown options
  // to send schema to populate form

  if (decoded.app_metadata.roles[0] == 'advocate') {
    // if they've been verified as advocate only
    var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app3RonGnLm3P4aVF');
    // currently PROD: REPORTS BASE

    // query airtable, 
    // check for advocate in approved advocate list
    let clientList = [];
    let orgList = [];
    let advocateId;
    console.log(decoded.app_metadata.org);
    console.log(decoded.email);
    base('Advocates').select({
      maxRecords: 1,
      fields: ["Email Address", "Advocate Client List", "Advocate Client List Names", "Full Org Client List", "Full Org List Names"],
      filterByFormula: `{Email Address}="${decoded.email}"`
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        advocateId = record.getId();
        let ids = record.get("Advocate Client List");
        let fullOrgList = record.get("Full Org Client List");
        let names = record.get("Advocate Client List Names");
        if (names !== undefined) {
          names = names.split(",");
          for (i = 0; i < names.length; i++) {
            clientList.push({
              name: names[i],
              id: ids[i]
            });
          }
        }
        let fullOrgNames = record.get("Full Org List Names");
        if (fullOrgNames !== undefined) {
          fullOrgNames = fullOrgNames.split(",");
          for (j = 0; j < fullOrgNames.length; j++) {
            orgList.push({
              name: fullOrgNames[j],
              id: fullOrgList[j]
            });
          }
        }
      });
      // If there are no more records, `done` will get called.
      fetchNextPage();
    }, async function done(err) {
      if (err) { console.error(err); return; }
      console.log(`${clientList.length} user records found.`);
      let schemaList = [];
      let schema = await getSchema();
      console.log(schema);
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
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          advocate: advocateId,
          clientList: clientList,
          orgList: orgList,
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
    // PROD REPORTS BASE
    const response = await fetch('https://api.airtable.com/v0/meta/bases/app3RonGnLm3P4aVF/tables', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`
      }
    });
    const data = await response.json();
    return data;
  }
};
