const jwt = require("jsonwebtoken");
const BlacklistModel = require("../models/blacklist.model");

require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];


    const existingToken = await BlacklistModel.findOne({ token: token });

    if (existingToken) {
      return res.status(401).json({ error: "Please login again." });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    req.body.userID = decoded.userID;

    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed." });
  }
};

module.exports = { auth };
