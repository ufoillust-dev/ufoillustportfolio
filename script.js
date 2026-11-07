const imgs = [
    "images/ilust1.png",
    "images/ilust2.jpg",
    "images/ilust3.jpg",
    "images/ilust4.png",
    "images/ilust5.jpg",
    "images/ilust6.png",
    "images/ilust7.jpg"
];

const track = document.getElementById("track");
const lightbox = document.getElementById("lightbox");
const full = document.getElementById("full");
const close = document.getElementById("close");


// Crear carrusel infinito
[...imgs, ...imgs].forEach(src => {

    const img = document.createElement("img");

    img.src = src;
    img.className = "item";

    img.onclick = () => {
        full.src = src;
        lightbox.classList.add("show");
    };

    track.appendChild(img);

});


// Cerrar visor con botón X
close.onclick = () => {
    lightbox.classList.remove("show");
};


// Cerrar haciendo click fuera de la imagen
lightbox.onclick = (e) => {

    if (e.target === lightbox) {
        lightbox.classList.remove("show");
    }

};


// Cerrar con tecla ESC
document.onkeydown = (e) => {

    if (e.key === "Escape") {
        lightbox.classList.remove("show");
    }

};
