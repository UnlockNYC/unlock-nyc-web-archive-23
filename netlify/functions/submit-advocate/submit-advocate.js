const Airtable = require('airtable');

exports.handler = function(event, context, callback) {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appiZpVxsiS1Ev5Zv');
  // TEST for now, staging base

  let reportData = JSON.parse(event.body);
  base('All reports').create({
    "Report Type": "CCHR reports",
    "@name": [`${reportData.client}`]
  }, function(err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("new report created by advocate form");
    console.log(record.getId());
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: 'report submitted' })
    })
  });
}

