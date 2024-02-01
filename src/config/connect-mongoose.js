const mongoose = require("mongoose");
(async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useUnifiedTopology:true,
      useNewUrlParser: true,
    });
    console.log("db connected successfully!");
  } catch (error) {
    console.log(error.message);
  }
})();