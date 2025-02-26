const fs = require('fs');

const path = require('path');

function loadRestoran() {
  try {
    const data = fs.readFileSync('data/restoran.json', 'utf-8');
    const jsonData = JSON.parse(data);
    return jsonData.restoran || []; // Ambil array restoran dari objek JSON
  } catch (error) {
    console.error('Gagal memuat restoran:', error);
    return [];
  }
}

function detailRestoran(nama) {
  const restoran = loadRestoran(); // Ini sekarang harus mengembalikan array
  return restoran.find((r) => r.nama.toLowerCase() === nama.toLowerCase());
}

module.exports = { loadRestoran, detailRestoran };
