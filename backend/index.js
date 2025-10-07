// const express = require("express");
// const connectDB = require("./utils/db.js");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const taskRoutes = require("./route/taskroute.js");

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());
// //cors
// app.use(cors({
//   origin: "http://127.0.0.1:5500"
// }));

// //route
// app.use("/api/tasks", taskRoutes);

// app.get("/", (req, res) => {
//   res.send("✅ Todo App Backend Running");
// });

// app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));

// connectDB();


const express = require("express");
const connectDB = require("./utils/db.js");
const dotenv = require("dotenv");
const cors = require("cors");
const taskRoutes = require("./route/taskroute.js");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// === CORS POLICY UPDATE ===
// We explicitly allow the live Netlify domain to make requests to this API.
const allowedOrigin = 'https://todoappfullstac.netlify.app';

app.use(cors({
  origin: allowedOrigin,
  // Add other necessary methods your frontend uses (GET/POST/PUT/DELETE)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true 
}));
// ==========================

//route
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("✅ Todo App Backend Running");
});

app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));

connectDB();