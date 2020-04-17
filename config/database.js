const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb+srv://prasanna_naralasetti:prassu@12345@cluster0-ou0we.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(function() {
    console.log("connected to db");
  })
  .catch(function() {
    console.log("error connecting to db");
  });

module.exports = {
  mongoose
}
