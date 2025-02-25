const fs = require('fs');

const path = require('path');

function loadRestoran() {
  try {
    const filePath = path.join(__dirname, 'data', 'restoran.json');
    const dataBuffer = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(dataBuffer);
    return data.restoran;
  } catch (err) {
    console.error('Error membaca file restoran.json:', err);
    return [];
  }
}

// detail contact berdasarkan nama
const detailRestoran = (nama) => {
  const restoran = loadRestoran();
  const detail = restoran.find((detail) => detail.nama === nama);
  return detail;
};

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

module.exports = { loadRestoran, detailRestoran, loadMakanan };
