exports.handler = function(event, context, callback) {

  let reportData = JSON.parse(event.body);
  let file = event.file;
  console.log(file);
  console.log(reportData);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ message: "testing" })
  });

}
