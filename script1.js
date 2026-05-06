let isAdmin = false;
let editIndex = null;
let produkDipilih = null;

const btnTambah = document.getElementById("tambahProduk");
const btnLogout = document.getElementById("logoutAdmin");

let dataProduk = JSON.parse(localStorage.getItem("produk")) || [];

// =====================
// TAMPIL PRODUK
// =====================
function tampilkanProduk() {
    let container = document.getElementById("container");
    container.innerHTML = "";

    dataProduk.forEach((item, index) => {
        let div = document.createElement("div");
        div.classList.add("product");

        let tombolBeli = item.stok > 0
            ? `<button onclick="beliProduk(${index})">Beli</button>`
            : `<button disabled>Sold Out</button>`;

        div.innerHTML = `
            <img src="${item.foto}">
            <h3>${item.nama}</h3>
            <p class="harga">${item.harga}</p>
            <p>Stok: ${item.stok ?? 0}</p>

            ${tombolBeli}

            ${isAdmin ? `
                <button onclick="editProduk(${index})">Edit</button>
                <button onclick="hapusProduk(${index})">Hapus</button>
            ` : ""}
        `;

        container.appendChild(div);
    });
}

// =====================
// ADMIN LOGIN
// =====================
function cekPassword() {
    let password = prompt("Code Reedem:");

    if (password === "1") {
        isAdmin = true;
        alert("Admin aktif!");
        updateTombol();
        tampilkanProduk();
    }
}

btnLogout.onclick = function() {
    isAdmin = false;
    updateTombol();
    tampilkanProduk();
};

function updateTombol() {
    btnTambah.style.display = isAdmin ? "block" : "none";
    btnLogout.style.display = isAdmin ? "block" : "none";
}

// =====================
// ADMIN CRUD
// =====================
btnTambah.onclick = function() {
    editIndex = null;
    bukaForm();
};

function editProduk(index) {
    editIndex = index;

    document.getElementById("nama").value = dataProduk[index].nama;
    document.getElementById("harga").value = dataProduk[index].harga;
    document.getElementById("foto").value = dataProduk[index].foto;
    document.getElementById("stok").value = dataProduk[index].stok ?? 0;

    bukaForm();
}

function hapusProduk(index) {
    dataProduk.splice(index, 1);
    simpanData();
}

function bukaForm() {
    document.getElementById("formPopup").style.display = "block";
}

function tutupForm() {
    document.getElementById("formPopup").style.display = "none";
}

function simpanProduk() {
    let nama = document.getElementById("nama").value;
    let harga = document.getElementById("harga").value;
    let foto = document.getElementById("foto").value;
    let stok = document.getElementById("stok").value;

    if (!nama || !harga || !foto || stok === "") {
        alert("Isi semua!");
        return;
    }

    let produkBaru = {
        nama,
        harga,
        foto,
        stok: Number(stok)
    };

    if (editIndex === null) {
        dataProduk.push(produkBaru);
    } else {
        dataProduk[editIndex] = produkBaru;
    }

    simpanData();
    tutupForm();
}

function simpanData() {
    localStorage.setItem("produk", JSON.stringify(dataProduk));
    tampilkanProduk();
}

// =====================
// BELI + WA
// =====================
function beliProduk(index) {
    produkDipilih = index;
    document.getElementById("waForm").style.display = "block";
}

function tutupWA() {
    document.getElementById("waForm").style.display = "none";
}

function kirimWA() {
    let nama = document.getElementById("wa_nama").value;
    let jumlah = Number(document.getElementById("wa_jumlah").value);
    let alamat = document.getElementById("wa_alamat").value;
    let tanggal = document.getElementById("wa_tanggal").value;
    let jam = document.getElementById("wa_jam").value;

    if (!nama || !jumlah || !alamat || !tanggal || !jam) {
        alert("Isi semua data!");
        return;
    }

    let produk = dataProduk[produkDipilih];

    if (jumlah > produk.stok) {
        alert("Stok tidak cukup!");
        return;
    }

    let harga = Number(String(produk.harga).replace(/\D/g, ""));
    let subtotal = harga * jumlah;

    // 🔥 kurangi stok
    produk.stok -= jumlah;
    simpanData();

    let nomor = "6285815237679";

    let pesan = `🧾 INVOICE

Produk: ${produk.nama}
Harga: Rp${harga}
Jumlah: ${jumlah}
Subtotal: Rp${subtotal}

Nama: ${nama}
Alamat: ${alamat}
Tanggal: ${tanggal}
Jam: ${jam}

TOTAL: Rp${subtotal}`;

    let url = `https://api.whatsapp.com/send?phone=${nomor}&text=${encodeURIComponent(pesan)}`;

    window.location.href = url;
}

// LOAD
updateTombol();
tampilkanProduk();