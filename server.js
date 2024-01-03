require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect");
const userRoutes = require("./routes/user");

app.use(express.json());

const port = process.env.PORT || 5000;

app.use(
  session({
    secret: "123456789",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 5 * 60 * 1000, // 5 minutes
    },
  })
);
app.use(cookieParser());
app.use("/", userRoutes);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
