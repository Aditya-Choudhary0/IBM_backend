// Import required modules
const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { bugRouter } = require("./routes/bug.route");
const { auth } = require("./middlewares/auth.middleware");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/" , (req,res)=>{
    res.send("welsome to home page")
})
app.use("/users", userRouter);
app.use("/bug",auth, bugRouter)

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Db connected");
   
    console.log("Server running at port 8080");
  } catch (error) {
    console.log(error.message);
  }
});
