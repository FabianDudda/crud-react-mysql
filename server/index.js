const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const cors = require("cors"); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

// Wird benötigt, um abfragen vom FrontEnd ans Backend zu machen
app.use(cors());
app.use(express.json());

// Database information
const db = mysql2.createConnection({
  user: "root",
  host: "localhost",
  password: "123456789",
  database: "tierheim_schema",
});

// Create a route locahost:3000/addTierheim
// Tierheim-Daten in die Datenbank hinzufügen
app.post("/addTierheim", (req, res) => {
  const name = req.body.name;
  const plz = req.body.plz;
  const ort = req.body.ort;
  const strasse = req.body.strasse;
  const telefon = req.body.telefon;

  db.query(
    "INSERT INTO tierheime (name, plz, ort, strasse, telefon) VALUES (?,?,?,?,?)",
    [name, plz, ort, strasse, telefon],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Die Daten wurden erfolgreich in die Datenbank eingetragen.");
      }
    }
  );
});

// Create a route locahost:3000/getTierheim
// Tierheim-Daten aus der Datenbank auslesen
app.get("/getTierheim", (req, res) => {
  db.query("SELECT * FROM tierheime", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3006, () => {
  console.log("Server is running on port 3006");
});
