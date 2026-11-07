// ---------- Referencias ----------
const track = document.getElementById('track');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

// ---------- Botones prev / next ----------
function scrollAmount() {
  const card = track.querySelector('.card');
  const gap = parseFloat(getComputedStyle(track).gap) || 24;
  return card ? card.offsetWidth + gap : 340;
}

nextBtn.addEventListener('click', () => {
  track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
  track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
});

// ---------- Arrastrar con el mouse (desktop) ----------
let isDown = false;
let startX = 0;
let startScroll = 0;
let moved = false;

track.addEventListener('mousedown', (e) => {
  isDown = true;
  moved = false;
  startX = e.pageX;
  startScroll = track.scrollLeft;
  track.classList.add('dragging');
});

window.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const delta = e.pageX - startX;
  if (Math.abs(delta) > 5) moved = true;
  track.scrollLeft = startScroll - delta;
});

window.addEventListener('mouseup', () => {
  isDown = false;
  track.classList.remove('dragging');
});

// ---------- Lightbox ----------
function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';   // bloquea scroll de fondo
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  // limpia la imagen tras la transición
  setTimeout(() => { lightboxImg.src = ''; }, 300);
}

track.addEventListener('click', (e) => {
  const img = e.target.closest('.card img');
  if (img && !moved) {
    openLightbox(img.src, img.alt);
  }
});

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox(); // clic fuera de la imagen
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) {
    closeLightbox();
  }
  // Navegación con flechas cuando el lightbox está abierto
  if (lightbox.classList.contains('open')) {
    const cards = [...track.querySelectorAll('.card img')];
    const current = cards.findIndex(img => img.src === lightboxImg.src);
    if (e.key === 'ArrowRight' && current < cards.length - 1) {
      openLightbox(cards[current + 1].src, cards[current + 1].alt);
    }
    if (e.key === 'ArrowLeft' && current > 0) {
      openLightbox(cards[current - 1].src, cards[current - 1].alt);
    }
  }
});