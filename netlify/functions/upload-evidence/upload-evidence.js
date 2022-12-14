exports.handler = function(event, context, callback) {

  console.log(event)
  let file = event.file;
  console.log(file);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ message: "testing" })
  });

}
