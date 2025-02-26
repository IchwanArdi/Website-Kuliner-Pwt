const express = require('express');
const restoran = require('../restoran');
const makanan = require('../makanan');

const app = express();

const dataRestoran = restoran.loadRestoran();
const dataMakanan = makanan.loadMakanan();

// Middleware untuk menangani form dan file statis
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Menggunakan EJS sebagai template engine
app.set('view engine', 'ejs');

// Route utama
app.get('/home', (req, res) => {
  res.render('index', { makanan: dataMakanan });
});

app.get('/', (req, res) => {
  // Redirect ke /home
  res.redirect('/home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
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

// Untuk deployment Vercel
module.exports = app;
