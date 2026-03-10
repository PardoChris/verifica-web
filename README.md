# E-Commerce Client Server

## Architettura

Il sistema è composto da:

Frontend: HTML, CSS, JavaScript  
Backend: Node.js con Express

Il client è un **Thin Client** perché tutta la logica viene gestita dal server.

---

## Endpoint

GET /api/products  
Restituisce il catalogo prodotti

GET /api/user  
Restituisce i crediti dell'utente

POST /api/buy  
Acquista un prodotto

POST /api/admin/add-product  
Aggiunge un prodotto

POST /api/admin/update-stock  
Modifica lo stock

POST /api/admin/add-credits  
Aggiunge crediti all'utente

---

## Sicurezza

Il server controlla:

- prodotto esistente
- stock disponibile
- crediti sufficienti

Se i controlli falliscono restituisce errore HTTP.

---

## Uso dell'IA

L'IA è stata utilizzata per:

- progettazione API
- debug del codice
- organizzazione dell'architettura


https://ecommerce-pardo.onrender.com
https://pardochris.github.io/verifica-web/