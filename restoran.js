const fs = require('fs');
const path = require('path');

function loadRestoran() {
  try {
    // Gunakan path absolut untuk memastikan lokasi file benar
    const filePath = path.resolve(__dirname, 'data', 'restoran.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(data);
    return jsonData.restoran || [];
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
