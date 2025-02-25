document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('toggleNav'); // Ambil tombol navbar-toggler
  const btnClose = document.querySelector('.btn-close');
  const iconsNav = document.querySelector('.icons-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggle && btnClose && iconsNav) {
    toggle.addEventListener('click', () => {
      // Ubah warna dan ukuran teks navbar
      navLinks.forEach((nav) => {
        nav.style.color = 'white';
        nav.style.fontSize = '20px';
        nav.style.textAlign = 'center';
      });

      // Munculkan ikon sosial media
      iconsNav.classList.remove('d-none');
    });

    btnClose.addEventListener('click', () => {
      // Sembunyikan ikon sosial media
      navLinks.forEach((nav) => {
        nav.style.color = 'black';
        nav.style.fontSize = '17px';
      });
      iconsNav.classList.add('d-none');
    });
  }
});

// script untuk slide makanan
const foodGallery = document.getElementById('foodGallery');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

prevBtn.addEventListener('click', () => {
  foodGallery.scrollBy({ left: -300, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
  foodGallery.scrollBy({ left: 300, behavior: 'smooth' });
});

window.onscroll = function () {
  const mybutton = document.getElementById('btn-back-to-top');

  if (window.scrollY >= 2000) {
    mybutton.style.display = 'block';
  } else {
    mybutton.style.display = 'none';
  }
};

document.getElementById('btn-back-to-top').addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function semuaRestoran() {
  // Fetch JSON file
  $('#daftar-restoran').empty(); // Mengosongkan daftar sebelum menambah data baru
  $.getJSON('/data/restoran.json').done(function (response) {
    let restoran = response.restoran;

    // Looping melalui data
    $.each(restoran, function (i, data) {
      $('#daftar-restoran').append(`
          <div class="col-md d-flex justify-content-center mb-4">
            <div class="kolom text-white">
              <img src="/img/restoran/${data.gambar}" alt="${data.nama}" class="img-rounded mb-3 gambar-makanan" />
              <h5>${data.nama}</h5>
              <p>${data.tempat}</p>
              <hr />
              <ul class="text-white p-0 m-0" style="list-style-type: none">
                <li class="text-white"><em>${data.deskripsi}</em></li>
              </ul>
              <div class="card-body mt-3">
                <button class="btn btn-warning btn-md" type="button">
                  <a class="text-black text-decoration-none" href="/restoran/${data.nama}">Detail</a>
                </button>
              </div>
            </div>
          </div>
        `);
    });
  });
}

semuaRestoran();

const navList = document.querySelectorAll('.nav-list');
navList.forEach((nav) => {
  nav.addEventListener('click', () => {
    let namaList = nav.innerHTML;

    // Jika kategori adalah 'All Menu', tampilkan semua menu
    if (namaList == 'All') {
      semuaRestoran();
      return; // Keluar dari fungsi setelah memanggil semuaMenu()
    }

    if (namaList == 'Others') {
      let content = `<h1 class="fw-bold text-white mt-5 mb-2 text-center">Restoran Belum ada</h1>`;
      $('#daftar-restoran').html(content);
      return;
    }

    // Jika kategori bukan 'All Menu', filter berdasarkan kategori
    $.getJSON('/data/restoran.json', function (response) {
      let restoran = response.restoran;
      let content = '';

      $.each(restoran, function (i, data) {
        if (data.kategori == namaList.toLowerCase()) {
          content += `<div class="col-md d-flex justify-content-center mb-4">
            <div class="kolom text-white">
              <img src="/img/restoran/${data.gambar}" alt="${data.nama}" class="img-rounded mb-3 gambar-makanan" />
              <h5>${data.nama}</h5>
              <p>${data.tempat}</p>
              <hr />
              <ul class="text-white p-0 m-0" style="list-style-type: none">
                <li class="text-white"><em>${data.deskripsi}</em></li>
              </ul>
              <div class="card-body mt-3">
                <button class="btn btn-warning btn-md" type="button">
                  <a class="text-black text-decoration-none" href="/restoran/${data.nama}">Detail</a>
                </button>
              </div>
            </div>
          </div>`;
        }
      });

      // Perbarui elemen daftar-menu dengan content yang difilter
      $('#daftar-restoran').html(content);
    });
  });
});
