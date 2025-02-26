const fs = require('fs');

const path = require('path');

function loadMakanan() {
  try {
    const fileData = './data/makanan.json';
    const dataBuffer = fs.readFileSync(fileData, 'utf-8'); // Membaca file
    const data = JSON.parse(dataBuffer); // Parsing data JSON
    return data.makanan; // Mengembalikan array `restoran`
  } catch (err) {
    console.error('Error membaca file restoran.json:', err);
    return []; // Kembalikan array kosong jika terjadi error
  }
}

module.exports = { loadMakanan };
