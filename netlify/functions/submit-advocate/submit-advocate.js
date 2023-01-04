const Airtable = require('airtable');

exports.handler = function(event, context, callback) {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appiZpVxsiS1Ev5Zv');
  // TEST for now, staging base

  let reportData = JSON.parse(event.body);
  let fullAddress = `${reportData.reportAddress} - Unit: ${reportData.unit}`;
  base('All reports').create({
    // the following uses airtable field IDs 
    // instead of column names, to protect in case of changes
    "fldAA5F50YecZRHsS": "CCHR reports", // Report Type
    "fldmkXAGphcHd2wkb": [`${reportData.client}`], // @name, client name
    "fld9LxV8g98hxNn0U": reportData.story, // @story
    "fldRLw8j0MvaYC6w2": reportData.incidentDate, // @date_specific
    "fldXkr2FlRPTvo1bO": fullAddress, // @address
    "fldhEdkPi8horzLD4": reportData.website, // @listing, source website
    "fldJVb2qvm3I0nhwH": reportData.url, // @url, listing 
    "fldLDDBMmULQ5gI1n": reportData.available // available? is apt. still available?
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

