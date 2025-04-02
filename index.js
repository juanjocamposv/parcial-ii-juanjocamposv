const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3000;

// Lista de productos en memoria
let products = [
  { id: 1, name: "Product 1", price: 1999 },
  { id: 2, name: "Product 2", price: 2999 },
  { id: 3, name: "Product 3", price: 3999 },
];

// Obtener todos los productos
app.get("/products", (req, res) => {
  res.json(products);
});

// Obtener un producto por ID
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

// Agregar un nuevo producto
app.post("/products", (req, res) => {
  const { id, name, price } = req.body;

  // Verificar que los campos sean válidos
  if (!id || !name || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Verificar si el producto ya existe
  if (products.some((p) => p.id === id)) {
    return res.status(400).json({ error: "Product with this ID already exists" });
  }

  const newProduct = { id, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.get('/', (req, res) => {
    res.send('¡Servidor funcionando!');
  });
  
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });

// Exportar para Vercel
module.exports = app;
