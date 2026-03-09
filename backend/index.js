const express = require('express');
const cors = require('cors');

const app = express();

// Middleware essenziali
app.use(cors());
app.use(express.json()); // Necessario per leggere i dati inviati in POST

// Array finto per simulare un database
let messages = [
    { "text": "ciao mondo" },
    { "text": "test API" }
];

// Endpoint GET
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// Endpoint POST
app.post('/api/messages', (req, res) => {
    const nuovoMessaggio = req.body;
    messages.push(nuovoMessaggio);
    // Restituisci il messaggio di successo e i dati
    res.status(201).json({ status: "success", added: nuovoMessaggio });
});

// La porta deve essere presa da process.env.PORT per funzionare su Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});