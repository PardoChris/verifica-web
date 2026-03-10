// 1. CONFIGURAZIONE: Cambia questo URL domani dopo il deploy su Render
const API_BASE = "http://localhost:3000/api"; 

async function loadStore() {
    const container = document.getElementById("prodotti");
    if (!container) return; 

    try {
        const userRes = await fetch(`${API_BASE}/user`);
        const user = await userRes.json();
        document.getElementById("saldo").innerHTML = `<h3>Crediti Disponibili: €${user.credits}</h3>`;

        const prodRes = await fetch(`${API_BASE}/products`);
        const products = await prodRes.json();
        
        container.innerHTML = products.map(p => `
            <div class="card">
                <h4>${p.name}</h4>
                <p>Prezzo: €${p.price}</p>
                <p>Disponibili: ${p.stock}</p>
                <button onclick="buyProduct(${p.id})" ${p.stock <= 0 ? 'disabled' : ''}>
                    ${p.stock > 0 ? 'Acquista' : 'Esaurito'}
                </button>
            </div>
        `).join("");
    } catch (err) {
        console.error("Errore nel caricamento store:", err);
    }
}

async function buyProduct(id) {
    try {
        const res = await fetch(`${API_BASE}/buy`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: id })
        });
        const result = await res.json();
        
        if (result.error) {
            alert("Errore: " + result.error);
        } else {
            alert(result.message);
            loadStore();
        }
    } catch (err) {
        alert("Errore di connessione al server");
    }
}

async function addAdminCredits() {
    try {
        const res = await fetch(`${API_BASE}/admin/add-credits`, { 
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();
        alert("Successo! Nuovo saldo utente: €" + data.credits);
    } catch (err) {
        alert("Errore nell'assegnazione crediti");
    }
}

if (document.getElementById("prodotti")) {
    loadStore();
}