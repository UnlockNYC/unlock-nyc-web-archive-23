const Airtable = require('airtable');

const handler = async (event) => {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appiZpVxsiS1Ev5Zv');
  // TEST for now, staging base

  console.log(event.body);

  base('All reports').create({
    "Report Type": "CCHR reports"
  }, function(err, records) {
    if (err) {
      console.error(err);
      return {
        statusCode: 500
      }
    }
    records.forEach(function(record) {
      console.log(record.getId());
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'report submitted' })
      }
    });
  });
}

module.exports = { handler }
