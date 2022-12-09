import * as Busboy from "busboy"
import * as Airtable from "airtable"

//const Airtable = require('airtable');

exports.handler = async function(event, context, callback) {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appiZpVxsiS1Ev5Zv');
  // TEST for now, staging base

  console.log(event.body);
  const fields = await parseMultipartForm(event)

  base('All reports').create({
    "Report Type": "CCHR reports",
    "@name": fields.client.split(",")
  }, function(err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(record.getId());
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: 'report submitted' })
    })
  });

  // busboy for parsing form
  function parseMultipartForm(event) {
    return new Promise((resolve) => {
      const fields = {};
      // let's instantiate our busboy instance!
      const busboy = new Busboy({
        // it uses request headers
        headers: event.headers
      });
      // before parsing anything, we need to set up some handlers.
      // whenever busboy comes across a file ...
      busboy.on(
        "file",
        (fieldname, filestream, filename, transferEncoding, mimeType) => {
          // ... we take a look at the file's data ...
          filestream.on("data", (data) => {
            // ... and write the file's name, type and content into `fields`.
            fields[fieldname] = {
              filename,
              type: mimeType,
              content: data,
            };
          });
        }
      );

      // whenever busboy comes across a normal field ...
      busboy.on("field", (fieldName, value) => {
        // ... we write its value into `fields`.
        fields[fieldName] = value;
      });

      // once busboy is finished, we resolve the promise with the resulted fields.
      busboy.on("finish", () => {
        resolve(fields)
      });

      // now that all handlers are set up, we can finally start processing our request!
      busboy.write(event.body);
    });
  }
}

