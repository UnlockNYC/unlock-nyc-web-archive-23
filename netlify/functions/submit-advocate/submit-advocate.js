const Airtable = require('airtable');

exports.handler = function(event, context, callback) {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appiZpVxsiS1Ev5Zv');
  // TEST for now, staging base

  let reportData = JSON.parse(event.body);
  let fullAddress = `${reportData.reportAddress} - Unit: ${reportData.unit}`;
  base('All reports').create({
    "Report Type": "CCHR reports",
    "@name": [`${reportData.client}`],
    "@story": reportData.story,
    "@date_specific": reportData.incidentDate,
    "@address": fullAddress,
    "@listing": reportData.website,
    "@url": reportData.url,
    "available?": reportData.available
  }, function(err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("new report created by advocate form");
    console.log(record.getId());
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        statusCode: 200,
        message: 'report submitted',
        record: record.getId()
      })
    })
  });
}

