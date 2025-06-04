// src/services/api.js

// ================================================
// 1. URL base: según json-server local (localhost:3001)
//    Cuando uses ngrok, reemplazás esto
//    por la URL que te dé ngrok (e.g. https://abcd1234.ngrok.io)
// ================================================
const API_BASE = "http://localhost:3001";

// 2. Función para traer todos los productos
export async function fetchProducts() {
  try {
    const resp = await fetch(`${API_BASE}/products`);
    if (!resp.ok) throw new Error("Error al obtener productos: " + resp.status);
    return await resp.json();
 
