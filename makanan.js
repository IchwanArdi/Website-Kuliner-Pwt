const fs = require('fs');
const path = require('path');

function loadMakanan() {
  try {
    // Gunakan path absolut
    const filePath = path.resolve(__dirname, 'data', 'makanan.json');

    // Cek apakah file ada sebelum dibaca
    if (!fs.existsSync(filePath)) {
      console.error(`File tidak ditemukan: ${filePath}`);
      return [];
    }

    // Membaca file JSON
    const dataBuffer = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(dataBuffer);
    return data.makanan || []; // Pastikan mengembalikan array kosong jika `makanan` undefined
  } catch (err) {
    console.error('Error membaca file makanan.json:', err);
    return []; // Mengembalikan array kosong jika terjadi error
  }
}

module.exports = { loadMakanan };
