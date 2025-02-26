const express = require('express');
const restoran = require('./restoran');
const makanan = require('./makanan');

const app = express();
const port = process.env.PORT || 3000;

const dataRestoran = restoran.loadRestoran();
const dataMakanan = makanan.loadMakanan();

// Middleware untuk menangani form dan file statis
app.use(express.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Root route - redirect ke home
app.get('/', (req, res) => {
  res.redirect('/home');
});

// Route utama
app.get('/home', (req, res) => {
  try {
    res.render('index', { makanan: dataMakanan });
  } catch (error) {
    console.error('Error saat render halaman home:', error);
    res.status(500).send('Terjadi kesalahan pada server');
  }
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

// Untuk development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
  });
}

// Untuk Vercel
module.exports = app;
