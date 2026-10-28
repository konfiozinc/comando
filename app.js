'use strict';

const PHONE = '573145786432';
const PUBLIC_URL = 'https://konfiozinc.github.io/comando/';
const quoteBase = 'Hola, quiero contratar el pickup COMANDO.';

document.querySelectorAll('.source-photo').forEach((image) => {
  const useFallback = () => {
    if (image.dataset.fallback && image.src !== new URL(image.dataset.fallback, location.href).href) image.src = image.dataset.fallback;
  };
  image.addEventListener('error', useFallback, { once: true });
  if (image.complete && image.naturalWidth === 0) useFallback();
});

document.querySelector('#date').min = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Bogota' });

const whatsappUrl = (message) => `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
document.querySelectorAll('[data-wa="general"]').forEach((link) => {
  link.href = whatsappUrl(`${quoteBase}\n\n¿Podrían confirmarme disponibilidad y precio?\n\nGracias.`);
});

document.querySelectorAll('.event-card').forEach((button) => {
  button.addEventListener('click', () => {
    const select = document.querySelector('#event');
    select.value = button.dataset.event;
    document.querySelector('#cotizar').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    setTimeout(() => document.querySelector('#name').focus(), 400);
  });
});

const videoPanel = document.querySelector('#video-panel');
document.querySelector('#open-videos').addEventListener('click', () => {
  videoPanel.open = true;
  videoPanel.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  videoPanel.querySelector('.play-button').focus({ preventScroll: true });
});
document.querySelectorAll('[data-close-panel]').forEach((button) => {
  button.addEventListener('click', () => {
    const panel = document.getElementById(button.dataset.closePanel);
    panel.querySelectorAll('video').forEach((video) => video.pause());
    panel.open = false;
    panel.querySelector('summary').focus();
  });
});

const fields = ['name', 'event', 'date', 'location', 'duration'];
const form = document.querySelector('#quote-form');
function validateField(id) {
  const input = document.getElementById(id);
  const error = document.getElementById(`${id}-error`);
  const valid = Boolean(input.value.trim());
  input.setAttribute('aria-invalid', String(!valid));
  input.setAttribute('aria-describedby', `${id}-error`);
  error.textContent = valid ? '' : 'Este campo es obligatorio.';
  return valid;
}
fields.forEach((id) => document.getElementById(id).addEventListener('blur', () => validateField(id)));
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const valid = fields.map(validateField).every(Boolean);
  if (!valid) { document.querySelector('[aria-invalid="true"]').focus(); return; }
  const value = (id) => document.getElementById(id).value.trim();
  const message = [quoteBase, '', `Mi nombre: ${value('name')}`, `Tipo de evento: ${value('event')}`, `Fecha: ${value('date')}`, `Municipio o ubicación: ${value('location')}`, `Duración aproximada: ${value('duration')}`, `Información adicional: ${value('comments') || 'Sin información adicional'}`, '', '¿Podrían confirmarme disponibilidad y precio?', '', 'Gracias.'].join('\n');
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
});

document.querySelectorAll('.video-stage').forEach((stage) => {
  stage.querySelector('button').addEventListener('click', () => {
    const video = document.createElement('video');
    video.controls = true;
    video.preload = 'metadata';
    video.playsInline = true;
    video.poster = stage.dataset.poster;
    video.src = stage.dataset.video;
    video.setAttribute('aria-label', stage.querySelector('img').alt.replace('Portada del ', ''));
    stage.replaceChildren(video);
    video.play().catch(() => {});
  });
});

const galleryImages = [...document.querySelectorAll('.gallery__item img')];
const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');
const closeLightbox = lightbox.querySelector('.lightbox__close');
let currentImage = 0;
let galleryTrigger = null;
let touchStart = null;
function showImage(index) {
  currentImage = (index + galleryImages.length) % galleryImages.length;
  const source = galleryImages[currentImage];
  lightboxImage.src = source.currentSrc || source.src;
  lightboxImage.alt = source.alt;
  lightboxCaption.textContent = source.alt;
}
function openLightbox(index, trigger) {
  galleryTrigger = trigger;
  showImage(index);
  lightbox.hidden = false;
  document.body.classList.add('lightbox-open');
  closeLightbox.focus();
}
function hideLightbox() {
  lightbox.hidden = true;
  document.body.classList.remove('lightbox-open');
  if (galleryTrigger) galleryTrigger.focus();
}
document.querySelectorAll('[data-gallery-index]').forEach((button) => button.addEventListener('click', () => openLightbox(Number(button.dataset.galleryIndex), button)));
closeLightbox.addEventListener('click', hideLightbox);
lightbox.querySelector('.lightbox__nav--prev').addEventListener('click', () => showImage(currentImage - 1));
lightbox.querySelector('.lightbox__nav--next').addEventListener('click', () => showImage(currentImage + 1));
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) hideLightbox(); });
lightbox.addEventListener('touchstart', (event) => { touchStart = event.changedTouches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', (event) => { if (touchStart === null) return; const delta = event.changedTouches[0].clientX - touchStart; if (Math.abs(delta) > 45) showImage(currentImage + (delta < 0 ? 1 : -1)); touchStart = null; }, { passive: true });
document.addEventListener('keydown', (event) => {
  if (!lightbox.hidden) {
    if (event.key === 'Escape') hideLightbox();
    if (event.key === 'ArrowLeft') showImage(currentImage - 1);
    if (event.key === 'ArrowRight') showImage(currentImage + 1);
  } else if (event.key === 'Escape') {
    const openPanel = document.querySelector('.media-panel[open]');
    if (openPanel) {
      openPanel.querySelectorAll('video').forEach((video) => video.pause());
      openPanel.open = false;
      openPanel.querySelector('summary').focus();
    }
  }
  if (!lightbox.hidden && event.key === 'Tab') {
    const controls = [...lightbox.querySelectorAll('button')];
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

const status = document.querySelector('#share-status');
async function shareCard() {
  const data = { title: 'COMANDO · Sonido para eventos', text: 'Conoce COMANDO y solicita una cotización para tu celebración.', url: PUBLIC_URL };
  try {
    if (navigator.share) await navigator.share(data);
    else if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(PUBLIC_URL); status.textContent = 'Enlace copiado.'; }
    else {
      const temporary = document.createElement('textarea'); temporary.value = PUBLIC_URL; temporary.setAttribute('readonly', ''); temporary.style.position = 'fixed'; temporary.style.opacity = '0';
      document.body.append(temporary); temporary.select(); document.execCommand('copy'); temporary.remove(); status.textContent = 'Enlace copiado.';
    }
  } catch (error) { if (error.name !== 'AbortError') status.textContent = 'No fue posible compartir. Copia la dirección del navegador.'; }
}
document.querySelector('#share-top').addEventListener('click', shareCard);
document.querySelector('#share-card').addEventListener('click', shareCard);
document.querySelector('#save-contact').addEventListener('click', () => {
  const card = ['BEGIN:VCARD', 'VERSION:3.0', 'FN:COMANDO', 'ORG:COMANDO', 'TEL;TYPE=CELL:+573145786432', 'NOTE:Pickup y sonido para eventos especiales', 'END:VCARD'].join('\r\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([card], { type: 'text/vcard;charset=utf-8' }));
  link.download = 'COMANDO.vcf';
  document.body.append(link); link.click(); link.remove(); URL.revokeObjectURL(link.href);
  status.textContent = 'Contacto preparado para guardar.';
});
