require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: ["http://localhost:5000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

connectDB();

app.use(bodyParser.json({ limit: "10mb" })); // https://gist.github.com/Maqsim/857a14a4909607be13d6810540d1b04f
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/cart", require("./routes/cartRoutes"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
