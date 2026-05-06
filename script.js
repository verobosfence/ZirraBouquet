document.addEventListener("DOMContentLoaded", function() {

/* ======================
   HIDDEN BUTTON
====================== */
let klik = 0;

document.getElementById("judul").addEventListener("click", function() {
    klik++;

    if (klik === 5) {
        let password = prompt("Masukkan password admin:");

        if (password === "1234") {
            bukaAdmin();
        } else {
            alert("Password salah!");
        }

        klik = 0;
    }
});

/* ======================
   EVENT TOMBOL SIMPAN (FIX)
====================== */
document.getElementById("btnSimpan").addEventListener("click", simpan);

/* ======================
   BUKA ADMIN
====================== */
function bukaAdmin() {
    document.getElementById("adminPanel").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

/* ======================
   SIMPAN DATA
====================== */
function simpan() {
    let judulBaru = document.getElementById("editJudul").value;
    let textBanner = document.getElementById("editBannerText").value;
    let linkBanner = document.getElementById("editBannerLink").value;
    let imgBanner = document.getElementById("editBannerImg").value;

    if (judulBaru !== "") {
        localStorage.setItem("judul", judulBaru);
        document.getElementById("judul").innerText = judulBaru;
    }

    if (textBanner !== "" && linkBanner !== "") {
        localStorage.setItem("bannerText", textBanner);
        localStorage.setItem("bannerLink", linkBanner);

        document.getElementById("bannerText").innerHTML =
            `<a href="${linkBanner}" target="_blank">${textBanner}</a>`;
    }

    if (imgBanner !== "") {
        localStorage.setItem("bannerImg", imgBanner);
        document.getElementById("bannerImg").src = imgBanner;
    }

    alert("Data berhasil disimpan ✅");
    tutupAdmin();
}

/* ======================
   LOAD DATA
====================== */
let judul = localStorage.getItem("judul");
let text = localStorage.getItem("bannerText");
let link = localStorage.getItem("bannerLink");
let img = localStorage.getItem("bannerImg");

if (judul) {
    document.getElementById("judul").innerText = judul;
}

if (text && link) {
    document.getElementById("bannerText").innerHTML =
        `<a href="${link}" target="_blank">${text}</a>`;
}

if (img) {
    document.getElementById("bannerImg").src = img;
}

/* ======================
   TUTUP ADMIN
====================== */
function tutupAdmin() {
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

document.getElementById("overlay").addEventListener("click", tutupAdmin);

});