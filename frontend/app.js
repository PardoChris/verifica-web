const API_BASE = "http://localhost:3000/api";

async function loadStore() {

    const saldoDiv = document.getElementById("saldo");
    const prodottiDiv = document.getElementById("prodotti");

    if (!prodottiDiv) return;

    const userRes = await fetch(API_BASE + "/user");
    const user = await userRes.json();

    saldoDiv.innerHTML = "<h3>Crediti: €" + user.credits + "</h3>";

    const prodRes = await fetch(API_BASE + "/products");
    const products = await prodRes.json();

    prodottiDiv.innerHTML = "";

    products.forEach(p => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
        <h3>${p.name}</h3>
        <p>Prezzo: €${p.price}</p>
        <p>Disponibili: ${p.stock}</p>
        <button onclick="buyProduct(${p.id})">Compra</button>
        `;

        prodottiDiv.appendChild(card);

    });

}

async function buyProduct(id) {

    const res = await fetch(API_BASE + "/buy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            productId: id
        })
    });

    const data = await res.json();

    if (data.error)
        alert(data.error);
    else
        alert("Acquisto completato");

    loadStore();

}

async function addProduct() {

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;

    await fetch(API_BASE + "/admin/add-product", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            price,
            stock
        })
    });

    alert("Prodotto aggiunto");

}

async function updateStock() {

    const productId = document.getElementById("productId").value;
    const stock = document.getElementById("newStock").value;

    const res = await fetch(API_BASE + "/admin/update-stock", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            productId: parseInt(productId),
            stock: parseInt(stock)
        })
    });

    const data = await res.json();

    if (data.error)
        alert(data.error);
    else
        alert("Stock aggiornato");

}

async function addAdminCredits() {

    const res = await fetch(API_BASE + "/admin/add-credits", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            amount: 100
        })
    });

    const data = await res.json();

    alert("Nuovo saldo: €" + data.credits);

}

loadStore();
