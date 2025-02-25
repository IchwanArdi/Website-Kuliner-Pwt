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

module.exports = { loadRestoran, detailRestoran };
