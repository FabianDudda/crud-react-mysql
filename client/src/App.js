import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [plz, setPLZ] = useState(0);
  const [ort, setOrt] = useState("");
  const [strasse, setStrasse] = useState("");
  const [telefon, setTelefon] = useState(0);

  const [tierheimList, setTierheimList] = useState([]);

  // Sendet die Daten aus dem FrontEnd zum BackEnd
  // Datei:     tierheim/server/index.js
  // Funktion:  app.post("/addTierheim", (req, res) => {...})
  const addTierheim = () => {
    Axios.post("http://localhost:3006/addTierheim", {
      name: name,
      plz: plz,
      ort: ort,
      strasse: strasse,
      telefon: telefon,
    }).then(() => {
      console.log("Die Daten wurden ins BackEnd gesendet.");
    });
  };

  // Sendet die Daten aus dem BackEnd zum FrontEnd
  // Datei:     tierheim/server/index.js
  // Funktion:  app.get("/getTierheim", (req, res) => {...})
  const getTierheim = () => {
    Axios.get("http://localhost:3006/getTierheim").then((response) => {
      setTierheimList(response.data);
      console.log("Die Daten wurden ins FrontEnd gesendet.");
    });
  };

  return (
    <div className="App">
      <div className="addTierheim">
        <label>Tierheim:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>PLZ:</label>
        <input
          type="number"
          onChange={(event) => {
            setPLZ(event.target.value);
          }}
        />
        <label>Ort:</label>
        <input
          type="text"
          onChange={(event) => {
            setOrt(event.target.value);
          }}
        />
        <label>Straße:</label>
        <input
          type="text"
          onChange={(event) => {
            setStrasse(event.target.value);
          }}
        />
        <label>Telefonnummer:</label>
        <input
          type="number"
          onChange={(event) => {
            setTelefon(event.target.value);
          }}
        />
        <button onClick={addTierheim}>Tierheim hinzufügen</button>
      </div>
      <br />
      <p>
        <hr></hr>
      </p>
      <div className="tierheim-content">
        <button onClick={getTierheim}>Tierheime anzeigen</button>

        {/* Durchläuft die tierheimList und gibt jedes Element zurück */}
        {tierheimList.map((val, key) => {
          return (
            <div className="tierheim">
              <div>Tierheim: {val.name}</div>
              <div>PLZ: {val.plz}</div>
              <div>Ort: {val.ort}</div>
              <div>Straße: {val.strasse}</div>
              <div>Telefon: {val.telefon}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
