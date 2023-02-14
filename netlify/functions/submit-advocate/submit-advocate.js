const Airtable = require('airtable');
const fetch = require('node-fetch');

exports.handler = function(event, context, callback) {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appiZpVxsiS1Ev5Zv');
  // TEST for now, staging base

  let reportData = JSON.parse(event.body);
  console.log(reportData);
  let fullAddress = `${reportData.reportAddress} - Unit: ${reportData.unit}`;
  base('All reports').create({
    // the following uses airtable field IDs 
    // instead of column names, to protect in case of changes
    "fldAA5F50YecZRHsS": "CCHR reports", // Report Type
    "fldmkXAGphcHd2wkb": [`${reportData.client}`], // @name, client name,
    "fldp0Cdze4QBCRIQy": reportData.discriminationType, // @type, no vouchers, etc.
    "fld9LxV8g98hxNn0U": reportData.story, // @story
    "fldRLw8j0MvaYC6w2": reportData.incidentDate, // @date_specific
    "fldXkr2FlRPTvo1bO": fullAddress, // @address
    "fldhEdkPi8horzLD4": reportData.website, // @listing, source website
    "fldZYKk8mQAJe05b5": reportData.denialType, // @denialtype, phone email etc.
    "fldJVb2qvm3I0nhwH": reportData.url, // @url, listing 
    "fldXZwgcmk4hwJD1I": parseInt(reportData.rent),
    "fldLDDBMmULQ5gI1n": reportData.available, // available? is apt. still available?,
    "fldHfhNDDz7Vgviec": reportData.intervention, // Does tenant want this apt?,
    "fld0KWctTTkkMxaRW": reportData.contact, // who is point of contact, tenant/advocate?
    "fld39iqRmYpy5M8j2": reportData.evidence // @evidence, y/n, uploaded via digital ocean
  }, function(err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("new report created by advocate form");
    let recordId = record.getId();
    console.log(recordId);

    let clientName = record.get("Name for Confirm E-Mail");
    let tenantEmail = record.get("Tenant E-Mail");
    let advocateEmail = record.get("Advocate E-Mail");

    if (advocateEmail == undefined) {
      console.log("no advocate assigned yet");
      /*base('User information').find("recmT5Ynt3WiqElU3", function(err, record) {
        if (err) { console.error(err); return; }
        console.log("made it here?!");
        console.log('Retrieved', record.id);
        console.log(record.get('Advocate E-Mail'));
      });*/
      // if there is no advocate assigned ...
      /*base('User information').update(reportData.client, {
        "Advocate": [`${reportData.advocate}`]
      }, function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(record.get('Advocate'));
        console.log(record.get('Advocate E-Mail'));
        advocateEmail = record.get('Advocate E-Mail');
        console.log(advocateEmail);
        });*/
    }

    let forSendGrid;
    if (tenantEmail) {
      forSendGrid = (tenantEmail.join(",") + ", " + advocateEmail.join(",")).split(",");
    } else {
      forSendGrid = advocateEmail;
    }
    if (advocateEmail == undefined) {
      console.log("STILL NO ADVOCATE ASSIGNED!");
      return;
    } else {
      sendConfirm(recordId);
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        statusCode: 200,
        message: 'report submitted',
        record: record.getId()
      })
    });

    async function sendConfirm(report) {
      const response = await fetch('https://unlock-staging.glitch.me/report/send-report-confirm', {
        method: 'POST',
        body: JSON.stringify({
          email: forSendGrid,
          name: clientName,
          address: fullAddress,
          url: reportData.url,
          report: report
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.CONFIRM_EMAIL_AUTH
        }
      });
      console.log(response);
    }
  });
}

