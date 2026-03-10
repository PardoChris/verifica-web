const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const productsPath = path.join(__dirname, "data", "products.json");
const userPath = path.join(__dirname, "data", "user.json");

function readData(file) {
    return JSON.parse(fs.readFileSync(file));
}

function writeData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

app.get("/api/products", (req, res) => {
    const products = readData(productsPath);
    res.json(products);
});

app.get("/api/user", (req, res) => {
    const user = readData(userPath);
    res.json(user);
});

app.post("/api/buy", (req, res) => {

    const { productId } = req.body;
    const products = readData(productsPath);
    const user = readData(userPath);
    const product = products.find(p => p.id === productId);

    if (!product)
        return res.status(404).json({ error: "Prodotto non trovato" });
    if (product.stock <= 0)
        return res.status(400).json({ error: "Prodotto esaurito" });
    if (user.credits < product.price)
        return res.status(400).json({ error: "Crediti insufficienti" });

    product.stock -= 1;
    user.credits -= product.price;

    writeData(productsPath, products);
    writeData(userPath, user);

    res.json({
        message: "Acquisto completato",
        user,
        product
    });
});
app.post("/api/admin/add-product", (req, res) => {
    const { name, price, stock } = req.body;
    const products = readData(productsPath);
    const newProduct = {
        id: products.length + 1,
        name,
        price: parseInt(price),
        stock: parseInt(stock)
    };
    products.push(newProduct);
    writeData(productsPath, products);
    res.json(newProduct);
});

app.post("/api/admin/update-stock", (req, res) => {
    const { productId, stock } = req.body;
    const products = readData(productsPath);
    const product = products.find(p => p.id === productId);
    if (!product)
        return res.status(404).json({ error: "Prodotto non trovato" });

    product.stock = parseInt(stock);

    writeData(productsPath, products);

    res.json(product);
});

app.post("/api/admin/add-credits", (req, res) => {

    const { amount } = req.body;

    const user = readData(userPath);

    user.credits += parseInt(amount);

    writeData(userPath, user);

    res.json(user);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
