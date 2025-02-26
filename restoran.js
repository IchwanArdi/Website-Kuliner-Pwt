const fs = require('fs');

function loadRestoran() {
  try {
    const data = fs.readFileSync('data/restoran.json', 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Gagal memuat restoran:', error);
    return [];
  }
}

function detailRestoran(nama) {
  const restoran = loadRestoran();
  return restoran.find((r) => r.nama.toLowerCase() === nama.toLowerCase());
}

module.exports = { loadRestoran, detailRestoran };
