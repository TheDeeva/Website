const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/deevaDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});