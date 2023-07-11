const Airtable = require('airtable');
const fetch = require('node-fetch');

exports.handler = function(event, context, callback) {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_TOKEN }).base('app3RonGnLm3P4aVF');
  // PROD REPORTS BASE

  let reportData = JSON.parse(event.body);
  let fullAddress = `${reportData.reportAddress} - Unit: ${reportData.unit}`;
  base('All reports').create({
    // the following uses airtable field IDs
    // instead of column names, to protect in case of changes
    "fldls47eVrIeaqMo2": "CCHR reports", // Report Type
    "fld7cW2PkKGJoBBgl": [`${reportData.client}`], // @name, client name,
    "fldaSBFI9xkDNqNMI": reportData.discriminationType, // @type, no vouchers, etc.
    "fldUDwnhbCCjImsW4": reportData.story, // @story
    "fldCDvAsVfZc9bbsc": reportData.incidentDate, // @date_specific
    "fldIcquOgkjVGX67Y": fullAddress, // @address
    "fld2wcMYdBLqC8Qze": reportData.website, // @listing, source website
    "fldKQJMhhj4Lpza7f": reportData.denialType, // @denialtype, phone email etc.
    "flduNauzqPxKbWmsR": reportData.url, // @url, listing
    "fldIRvIlhNyjHiIXS": parseInt(reportData.rent),
    "fld3LQiU1MEcyqADh": reportData.available, // available? is apt. still available?,
    "flds7gfMy2BXr4nam": reportData.intervention, // Does tenant want this apt?,
    "fldkit1voLUsvQ3Im": reportData.contact, // who is point of contact, tenant/advocate?
    "fldO1hS0hrTAgldfc": reportData.evidence // @evidence, y/n, uploaded via digital ocean
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

    let forSendGrid;
    if (tenantEmail && advocateEmail) {
      forSendGrid = (tenantEmail.join(",") + ", " + advocateEmail.join(",")).split(",");
    } else {
      forSendGrid = advocateEmail;
    }

    if (advocateEmail) {
      sendConfirm(recordId);
    } else {
      console.log("missing advocate assignment");
      console.log(reportData.client);
      base('User information').update(reportData.client, {
        "Advocate": [`${reportData.advocate}`]
      }, function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
        console.log("added an advocate");
        advocateEmail = record.get('Advocate E-mail');
        console.log(advocateEmail);
        if (tenantEmail && advocateEmail) {
          forSendGrid = (tenantEmail.join(",") + ", " + advocateEmail.join(",")).split(",");
        } else {
          forSendGrid = advocateEmail;
        }
        sendConfirm(recordId);
      });
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
      // PROD, URL base
      const response = await fetch('https://secure.weunlock.nyc/report/send-report-confirm', {
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
