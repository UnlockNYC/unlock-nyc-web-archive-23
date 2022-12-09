const Airtable = require('airtable');

const handler = async (event) => {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appiZpVxsiS1Ev5Zv');
  // TEST for now, staging base

  console.log(event.body);
  try {
    base('All reports').create({
      "Report Type": "CCHR reports"
    }, function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function(record) {
        console.log(record.getId());
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'report submitted' })
        }
      });
    });
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
