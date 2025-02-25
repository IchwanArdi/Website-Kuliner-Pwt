const express = require('express');
const restoran = require('./restoran');
const makanan = require('./makanan'); // Pastikan ini benar

const app = express();
const port = process.env.PORT || 3000;

const dataRestoran = restoran.loadRestoran(); // Memuat data dari file JSON
const dataMakanan = makanan.loadMakanan(); // Memuat data dari file JSON

// Middleware untuk menangani form dan file statis
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Menggunakan EJS sebagai template engine
app.set('view engine', 'ejs');

// Route utama
app.get('/', (req, res) => {
  res.render('index', { makanan: dataMakanan }); // Mengirim data ke template EJS
});

app.get('/about', (req, res) => {
  res.render('about'); // Mengirim data ke template EJS
});

app.get('/contact', (req, res) => {
  res.render('contact'); // Mengirim data ke template EJS
});

// Halaman detail restoran
app.get('/restoran/:nama', (req, res) => {
  const restoranDetail = restoran.detailRestoran(req.params.nama);
  if (restoranDetail) {
    res.render('detail-restoran', { restoran: restoranDetail });
  } else {
    res.status(404).send('Restoran Not Found!');
  }
});

// 404 Page Not Found
app.use((req, res) => {
  res.status(404).send('<h1>Page Not Found!</h1>');
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
