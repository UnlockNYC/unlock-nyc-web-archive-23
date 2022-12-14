const busboy = require('busboy');

exports.handler = async function(event, context, callback) {

  const fields = await parseMultipartForm(event);
  console.log(fields);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ message: "testing" })
  });

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
