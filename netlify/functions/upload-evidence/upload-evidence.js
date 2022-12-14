const busboy = require('busboy');
const aws = require("aws-sdk");

aws.config.update({
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET
});
const spacesEndpoint = new aws.Endpoint("nyc3.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

const spaces_bucket = 'staging-unlock'; // TEST STAGING

exports.handler = async function(event, context, callback) {

  const fields = await parseMultipartForm(event);
  console.log(fields);
  const record = fields.record;
  const numFiles = fields["files[]"].length;
  console.log(record);

  for (i = 0; i < numFiles; i++) {
    let file = fields["files[]"][i];
    fileParams = {
      Bucket: spaces_bucket,
      Key: `reports/${record}/${file.filename}`,
      Body: file.content
    };
    await uploadEvidence(fileParams);
  }

  if (i == numFiles) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        statusCode: 200,
        message: `${numFiles} file(s) uploaded`
      })
    });
  }

  async function uploadEvidence(parameters) {
    s3.upload(parameters, function(err) {
      if (err) {
        console.log(err);
      }
      console.log("1 file uploaded");
    });
  }

  function parseMultipartForm(event) {
    return new Promise((resolve) => {
      const fields = {};
      const bb = busboy({
        headers: event.headers
      });

      bb.on("file", (name, file, info) => {
        const { filename, encoding, mimeType } = info;
        file.on("data", (data) => {
          if (!fields[name])
            fields[name] = []

          fields[name].push({
            filename,
            type: mimeType,
            content: data,
          });
        })
      }
      );

      bb.on("field", (fieldName, value) => {
        fields[fieldName] = value;
      });

      bb.on("close", () => {
        resolve(fields)
      });

      bb.end(Buffer.from(event.body, 'base64'));
    });

  }
}
