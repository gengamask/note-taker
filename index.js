const express = require("express");
const router = require("./routes/index")
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// getting router.
app.use('/api', router);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
