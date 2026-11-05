const screens = [...document.querySelectorAll('.screen')];
const breeze = document.querySelector('#breeze');
const flame = document.querySelector('#flame');
const candle = document.querySelector('.candle');
const celebration = document.querySelector('#celebration');
const confettiLayer = document.querySelector('#confetti-layer');
const blowCard = document.querySelector('#blow-card');
const homeHint = document.querySelector('#home-hint');
let wished = false;

function goTo(id) {
  screens.forEach(screen => screen.classList.toggle('active', screen.id === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-go]').forEach(button => {
  button.addEventListener('click', () => goTo(button.dataset.go));
});

function celebrate() {
  if (wished) return;
  wished = true;
  candle.classList.add('off');
  candle.classList.remove('wind-blowing');
  celebration.classList.add('show');
  homeHint.textContent = 'Your wish is on its way, birthday girl ♡';
  breeze.classList.add('disabled');
  blowCard.classList.add('wish-made');
  const pieces = ['✿', '♡', '✦', '🌼', '🍬', '🌸', '✧', '🎉'];
  for (let i = 0; i < 64; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.fontSize = `${12 + Math.random() * 15}px`;
    piece.style.color = ['#d27682', '#e8b65d', '#9ab9a4', '#bc8bbd', '#e89176'][i % 5];
    piece.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
    piece.style.setProperty('--spin', `${Math.random() * 720 - 360}deg`);
    piece.style.animationDuration = `${3.2 + Math.random() * 2.2}s`;
    piece.style.animationDelay = `${Math.random() * .7}s`;
    confettiLayer.append(piece);
  }
  window.setTimeout(() => {
    confettiLayer.replaceChildren();
    celebration.classList.remove('show');
    const next = document.createElement('button');
    next.className = 'pill-button wish-next';
    next.innerHTML = 'Let’s share some cake <span>→</span>';
    next.addEventListener('click', () => goTo('cutting'));
    blowCard.replaceWith(next);
    homeHint.textContent = 'A little celebration for the birthday girl ✨';
  }, 5000);
}

let draggingBreeze = false;
let breezeOrigin = null;
breeze.addEventListener('keydown', event => {
  if ((event.key === 'Enter' || event.key === ' ') && !wished) { event.preventDefault(); celebrate(); }
});
breeze.addEventListener('pointerdown', event => {
  if (wished) return;
  draggingBreeze = true;
  breezeOrigin = { x: event.clientX, y: event.clientY };
  breeze.setPointerCapture(event.pointerId);
  breeze.classList.add('floating');
  event.preventDefault();
});
breeze.addEventListener('pointermove', event => {
  if (!draggingBreeze || wished) return;
  breeze.style.position = 'fixed';
  breeze.style.zIndex = '8';
  breeze.style.left = `${event.clientX - breeze.offsetWidth / 2}px`;
  breeze.style.top = `${event.clientY - breeze.offsetHeight / 2}px`;
  breeze.style.margin = '0';
  const flameRect = flame.getBoundingClientRect();
  const cx = flameRect.left + flameRect.width / 2;
  const cy = flameRect.top + flameRect.height / 2;
  const distanceToFlame = Math.hypot(event.clientX - cx, event.clientY - cy);
  candle.classList.toggle('wind-blowing', distanceToFlame < 125);
  if (distanceToFlame < 72) celebrate();
});
function releaseBreeze() {
  if (!draggingBreeze) return;
  const wasTap = breezeOrigin && Math.hypot(
    (Number.parseFloat(breeze.style.left) + breeze.offsetWidth / 2 || breezeOrigin.x) - breezeOrigin.x,
    (Number.parseFloat(breeze.style.top) + breeze.offsetHeight / 2 || breezeOrigin.y) - breezeOrigin.y
  ) < 15;
  draggingBreeze = false;
  breezeOrigin = null;
  breeze.style.position = '';
  breeze.style.left = '';
  breeze.style.top = '';
  breeze.style.zIndex = '';
  breeze.style.margin = '';
  if (wasTap && !wished) celebrate();
}
breeze.addEventListener('pointerup', releaseBreeze);
breeze.addEventListener('pointercancel', releaseBreeze);

const knife = document.querySelector('#knife');
const sliceStage = document.querySelector('#slice-stage');
const cutHint = document.querySelector('#cut-hint');
const coupleScene = document.querySelector('#couple-scene');
let knifeStart = null;
let cut = false;
function cutCake() {
  if (cut) return;
  cut = true;
  sliceStage.classList.add('cut');
  cutHint.textContent = 'Perfect slice, made with extra love ♡';
  window.setTimeout(() => coupleScene.classList.add('show'), 700);
}
knife.addEventListener('pointerdown', event => {
  if (cut) return;
  knifeStart = { x: event.clientX, y: event.clientY };
  knife.setPointerCapture(event.pointerId);
  event.preventDefault();
});
knife.addEventListener('pointermove', event => {
  if (!knifeStart || cut) return;
  const dx = event.clientX - knifeStart.x;
  const dy = event.clientY - knifeStart.y;
  knife.style.transform = `translate(${dx}px,${dy}px) rotate(-25deg)`;
  if (Math.abs(dx) > 145) cutCake();
});
function releaseKnife() {
  if (!knifeStart) return;
  knifeStart = null;
  if (!cut) knife.style.transform = '';
}
knife.addEventListener('pointerup', releaseKnife);
knife.addEventListener('pointercancel', releaseKnife);
knife.addEventListener('click', () => { if (!cut) cutCake(); });
knife.addEventListener('keydown', event => {
  if ((event.key === 'Enter' || event.key === ' ') && !cut) { event.preventDefault(); cutCake(); }
});

const feedButton = document.querySelector('#feed-button');
const coupleCaption = document.querySelector('#couple-caption');
let fedHer = false;
feedButton.addEventListener('click', () => {
  if (!fedHer) {
    fedHer = true;
    coupleScene.classList.add('boy-fed');
    coupleCaption.textContent = 'You get the first bite, birthday girl ♡';
    feedButton.innerHTML = 'Now you feed me <span>♡</span>';
  } else {
    coupleScene.classList.remove('boy-fed');
    coupleScene.classList.add('girl-fed', 'both-fed');
    coupleCaption.textContent = 'Mmm… sweetest birthday ever!';
  }
});
document.querySelector('#letter-button').addEventListener('click', () => goTo('letter'));
const wishForm = document.querySelector('#wish-form');
const wishInput = document.querySelector('#wish-input');
const wishCount = document.querySelector('#wish-count');
const wishKeepsake = document.querySelector('#wish-keepsake');
const wishDisplay = document.querySelector('#wish-display');
const wishEmailStatus = document.querySelector('#wish-email-status');
const wishEmailLink = document.querySelector('#wish-email-link');
wishInput.addEventListener('input', () => {
  wishCount.textContent = `${wishInput.value.length} / 160`;
});
wishForm.addEventListener('submit', event => {
  event.preventDefault();
  const wish = wishInput.value.trim();
  if (!wish) {
    wishInput.focus();
    return;
  }
  wishDisplay.textContent = wish;
  const recipient = 'sarangchoudhary0045@gmail.com';
  const subject = 'A birthday wish for you';
  const body = `${wish}\n\nSent from your birthday surprise ♡`;
  const gmailDraft = new URL('https://mail.google.com/mail/');
  gmailDraft.searchParams.set('view', 'cm');
  gmailDraft.searchParams.set('fs', '1');
  gmailDraft.searchParams.set('to', recipient);
  gmailDraft.searchParams.set('su', subject);
  gmailDraft.searchParams.set('body', body);
  wishEmailLink.href = gmailDraft.toString();
  wishEmailLink.hidden = true;
  const draftWindow = window.open(gmailDraft.toString(), '_blank');
  if (draftWindow) {
    draftWindow.opener = null;
    wishEmailStatus.textContent = 'A Gmail draft is open in a new tab. Tap Send there to email your wish.';
  } else {
    wishEmailStatus.textContent = 'Your Gmail draft is ready. Open it below, then tap Send to email your wish.';
    wishEmailLink.hidden = false;
  }
  wishKeepsake.hidden = false;
  goTo('memories');
});
document.querySelector('#again-button').addEventListener('click', () => window.location.reload());

const photoUpload = document.querySelector('#photo-upload');
const photoLine = document.querySelector('#photo-line');
const photoStatus = document.querySelector('#photo-status');
const photoDialog = document.querySelector('#photo-dialog');
const photoDialogImage = document.querySelector('#photo-dialog-image');
const photoDialogClose = document.querySelector('#photo-dialog-close');
const photoReplaceInput = document.querySelector('#photo-replace-input');
let replacePhotoSlot = null;
// Packaged, web-sized photo copies make the gallery ready on every device.
const bundledPhotos = [
  "photos/optimized/IMG-20260113-WA0008.jpg",
  "photos/optimized/IMG-20260126-WA0024.jpg",
  "photos/optimized/IMG-20260224-WA0051.jpg",
  "photos/optimized/IMG-20260521-WA0032.jpg",
  "photos/optimized/IMG-20260521-WA0038.jpg",
  "photos/optimized/IMG_20260224_000713.jpg",
  "photos/optimized/IMG_20260307_124045.jpg",
  "photos/optimized/IMG_20260307_124106.jpg",
  "photos/optimized/IMG_20260308_153303.jpg",
  "photos/optimized/IMG_20260308_154538.jpg",
  "photos/optimized/IMG_20260421_133516.jpg",
  "photos/optimized/IMG_20260501_004703.jpg",
  "photos/optimized/IMG_20260728_121734.jpg",
  "photos/optimized/IMG_20260803_100042.jpg",
  "photos/optimized/IMG_20260826_134517.jpg",
  "photos/optimized/IMG_20260826_134627.jpg",
  "photos/optimized/IMG_20261029_102638.jpg",
  "photos/optimized/IMG_20261103_142156.jpg",
  "photos/optimized/Screenshot_20260613_160006.jpg",
  "photos/optimized/Screenshot_20260624_012412.jpg",
  "photos/optimized/Screenshot_20260811_203007_AstroSage AI.jpg",
  "photos/optimized/WhatsApp Image 2026-11-05 at 23.41.37.jpg",
  "photos/optimized/WhatsApp Image 2026-11-05 at 23.41.38 (1).jpg",
  "photos/optimized/WhatsApp Image 2026-11-05 at 23.41.38 (2).jpg",
  "photos/optimized/WhatsApp Image 2026-11-05 at 23.41.38 (3).jpg",
  "photos/optimized/WhatsApp Image 2026-11-05 at 23.41.38.jpg"
];
const frameCount = Math.max(25, bundledPhotos.length);
const memoryPhotos = Array(frameCount).fill(null);
const memoryPhotoUrls = Array(frameCount).fill(null);
const memoryMoments = [
  ['☀', 'our first little hello', 'the day it all began'],
  ['☁', 'your happiest adventure', 'my favorite co-pilot'],
  ['🌷', 'a day worth reliving', 'just us being us'],
  ['☼', 'one more memory to keep', 'more adventures, please'],
  ['♡', 'our favorite place', 'where we laughed for hours'],
  ['✿', 'a perfect ordinary day', 'ordinary, with you'],
  ['🍓', 'sweetest little date', 'strawberries and smiles'],
  ['☕', 'our cozy morning', 'coffee tastes better together'],
  ['🌈', 'that lovely afternoon', 'the sky joined our date'],
  ['🎡', 'our silly adventure', 'one more ride, please'],
  ['🌙', 'a night to remember', 'under the same moon'],
  ['🌻', 'sunshine and your smile', 'my favorite kind of sunshine'],
  ['🧸', 'a soft and slow day', 'nowhere else to be'],
  ['🍰', 'the best dessert date', 'saving you the last bite'],
  ['🎀', 'a tiny surprise for you', 'you deserve every nice thing'],
  ['🌊', 'our little escape', 'wish we were still there'],
  ['🎶', 'our song came on', 'and you danced anyway'],
  ['🕊', 'a peaceful little moment', 'my calm, my home'],
  ['🍒', 'matching silly smiles', 'we make a cute team'],
  ['✨', 'a little bit of magic', 'everything glows with you'],
  ['📷', 'one of a hundred selfies', 'I love this one most'],
  ['🌸', 'flowers just because', 'you are my favorite bloom'],
  ['🍿', 'movie night together', 'you fell asleep first'],
  ['🧁', 'birthday girl practice', 'a sweet preview of today'],
  ['💌', 'a promise for tomorrow', 'many more memories to come']
];
const frameColors = ['peach', 'lavender', 'mint', 'butter'];
Array.from({ length: frameCount }, (_, index) => {
  const icon = memoryMoments[index % memoryMoments.length][0];
  const card = document.createElement('figure');
  card.className = `photo-card ${index % 2 ? 'card-tilt-right' : 'card-tilt-left'}`;
  card.dataset.slot = index;
  card.dataset.memorySlot = 'true';
  const pin = document.createElement('span');
  pin.className = 'pin';
  pin.textContent = index % 3 === 1 ? '♡' : '✿';
  const frame = document.createElement('div');
  frame.className = `photo-frame photo-placeholder ${frameColors[index % frameColors.length]}`;
  const sticker = document.createElement('span');
  sticker.textContent = icon;
  frame.append(sticker);
  card.append(pin, frame);
  card.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && memoryPhotos[index]) {
      event.preventDefault();
      openPhoto(index);
    }
  });
  photoLine.append(card);
});

function renderMemoryPhoto(slot, source) {
  const card = photoLine.querySelector(`.photo-card[data-slot="${slot}"]`);
  if (!card) return;
  const frame = card.querySelector('.photo-frame');
  frame.classList.remove('photo-placeholder', 'peach', 'lavender', 'mint', 'butter');
  const image = document.createElement('img');
  if (memoryPhotoUrls[slot]) URL.revokeObjectURL(memoryPhotoUrls[slot]);
  memoryPhotoUrls[slot] = source instanceof Blob ? URL.createObjectURL(source) : null;
  image.src = memoryPhotoUrls[slot] || source;
  image.alt = `Memory photo ${slot + 1}`;
  image.loading = 'lazy';
  image.decoding = 'async';
  frame.replaceChildren(image);
  card.classList.add('has-photo');
  card.dataset.memorySlot = 'false';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Open photo ${slot + 1}`);
}

function openPhoto(slot) {
  const photo = memoryPhotos[slot];
  if (!photo) return;
  replacePhotoSlot = slot;
  photoDialogImage.src = photo.blob ? URL.createObjectURL(photo.blob) : photo.src;
  photoDialog.showModal();
}

function savePhoto(slot, file) {
  const record = { slot, blob: file };
  memoryPhotos[slot] = record;
  renderMemoryPhoto(slot, file);
  try {
    const request = indexedDB.open('birthdayher-memories', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('photos', { keyPath: 'slot' });
    request.onsuccess = () => {
      const database = request.result;
      const transaction = database.transaction('photos', 'readwrite');
      transaction.objectStore('photos').put(record);
      transaction.oncomplete = () => database.close();
      transaction.onerror = () => {
        database.close();
        photoStatus.textContent = 'This photo is visible now, but could not be saved in this browser.';
      };
    };
    request.onerror = () => { photoStatus.textContent = 'This photo is visible now, but could not be saved in this browser.'; };
  } catch {
    photoStatus.textContent = 'This photo is visible now, but could not be saved in this browser.';
  }
}

function restoreMemoryPhotos() {
  try {
    const request = indexedDB.open('birthdayher-memories', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('photos', { keyPath: 'slot' });
    request.onsuccess = () => {
      const database = request.result;
      const transaction = database.transaction('photos', 'readonly');
      const read = transaction.objectStore('photos').getAll();
      read.onsuccess = () => {
        read.result.forEach(photo => {
          if (photo.slot >= 0 && photo.slot < memoryPhotos.length) {
            memoryPhotos[photo.slot] = photo;
            renderMemoryPhoto(photo.slot, photo.blob);
          }
        });
        const saved = read.result.length;
        if (saved) photoStatus.textContent = `${saved} photo${saved === 1 ? '' : 's'} saved in this browser. Add more or tap one to replace it.`;
        database.close();
      };
      read.onerror = () => database.close();
    };
    request.onerror = () => { photoStatus.textContent = 'Choose photos here; they will stay for this visit.'; };
  } catch {
    photoStatus.textContent = 'Choose photos here; they will stay for this visit.';
  }
}

function saveSelectedPhotos(files, slots) {
  const count = Math.min(files.length, slots.length);
  for (let index = 0; index < count; index++) savePhoto(slots[index], files[index]);
  return count;
}

photoUpload.addEventListener('change', event => {
  const files = [...event.target.files].filter(file => file.type.startsWith('image/'));
  const emptySlots = memoryPhotos.map((photo, index) => photo ? -1 : index).filter(index => index >= 0);
  const count = saveSelectedPhotos(files, emptySlots);
  if (count < files.length) photoStatus.textContent = `Added ${count} photo${count === 1 ? '' : 's'}. All ${memoryPhotos.length} frames are full; tap a picture to replace it.`;
  else if (count) photoStatus.textContent = `${count} photo${count === 1 ? '' : 's'} saved in this browser. Tap any photo to view or replace it.`;
  else photoStatus.textContent = `All ${memoryPhotos.length} frames are full. Tap any photo to replace it.`;
  photoUpload.value = '';
});

photoLine.addEventListener('click', event => {
  const card = event.target.closest('.photo-card.has-photo');
  if (card) openPhoto(Number(card.dataset.slot));
});
photoDialogClose.addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('click', event => {
  if (event.target === photoDialog) photoDialog.close();
});
photoDialog.addEventListener('close', () => {
  if (photoDialogImage.src.startsWith('blob:')) URL.revokeObjectURL(photoDialogImage.src);
  photoDialogImage.removeAttribute('src');
  replacePhotoSlot = null;
});
photoReplaceInput.addEventListener('change', event => {
  const file = event.target.files?.[0];
  if (file && replacePhotoSlot !== null) {
    const slot = replacePhotoSlot;
    savePhoto(slot, file);
    photoDialog.close();
    photoStatus.textContent = 'Photo replaced and saved in this browser.';
  }
  photoReplaceInput.value = '';
});
restoreMemoryPhotos();
bundledPhotos.forEach((src, slot) => {
  if (!src) return;
  memoryPhotos[slot] = { slot, src };
  renderMemoryPhoto(slot, src);
});
