const welcomeScreen = document.getElementById('welcomeScreen');
const memoryScreen = document.getElementById('memoryScreen');
const startButton = document.getElementById('startButton');
const musicButton = document.getElementById('musicButton');
const song = document.getElementById('birthdaySong');
const slides = [...document.querySelectorAll('.slide')];
const dots = document.getElementById('dots');
const counter = document.getElementById('counter');
let currentSlide = 0;
let autoAdvance;

slides.forEach((_, index) => {
	const dot = document.createElement('button');
	dot.className = 'dot' + (index === 0 ? ' active' : '');
	dot.setAttribute('aria-label', 'Show photo ' + (index + 1));
	dot.addEventListener('click', () => showSlide(index));
	dots.appendChild(dot);
});

function showSlide(index) {
	currentSlide = (index + slides.length) % slides.length;
	slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === currentSlide));
	[...dots.children].forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === currentSlide));
	counter.textContent = String(currentSlide + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
}

function restartAutoAdvance() {
	clearInterval(autoAdvance);
	autoAdvance = setInterval(() => showSlide(currentSlide + 1), 5000);
}

startButton.addEventListener('click', () => {
	welcomeScreen.style.display = 'none';
	memoryScreen.classList.add('active');
	song.play().catch(() => musicButton.textContent = '♫ Play music');
	restartAutoAdvance();
});
document.getElementById('previousButton').addEventListener('click', () => { showSlide(currentSlide - 1); restartAutoAdvance(); });
document.getElementById('nextButton').addEventListener('click', () => { showSlide(currentSlide + 1); restartAutoAdvance(); });
musicButton.addEventListener('click', () => {
	if (song.paused) { song.play(); musicButton.innerHTML = '<span>♫</span> Music on'; }
	else { song.pause(); musicButton.innerHTML = '<span>♫</span> Music off'; }
});
