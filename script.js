const keys = Array.from(document.querySelectorAll('.key'));
const starImage = document.querySelector('img.star');
const instructions = document.querySelector('.instructions');
const blast = document.querySelector('audio.blast');

let order = 1;
let lastPlayed = 0;
let secondLastPlayed = 0;

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

function animateStar(star) {
    star.classList.remove('offscreen');
    setTimeout(() => {
        star.classList.add('slideout');
    }, 2500);
    setTimeout(() => {
        star.classList.add('offscreen');
        star.classList.remove('slideout');
    }, 3000);
}

function playVoice(e) {
    instructions.style.opacity = 0;

    if (secondLastPlayed && secondLastPlayed.currentTime > 0) {
        secondLastPlayed.pause();
        secondLastPlayed.currentTime = 0;
    }

    const key = document.querySelector(`div.key[data-key="${e.keyCode}"]`) || this;
    if (key === window) return;
    const soundGroup = document.querySelector(`div.group[data-group="${key.dataset.group}"]`);
    const sound = soundGroup.querySelector(`audio[data-order="${order}"]`);
    key.classList.add('playing');
    sound.play();
    sound.currentTime = 0;
    if (order >= 8) {
        animateStar(starImage);
        blast.play();
        order = 1;
    } else {
        order += 1;
    }

    secondLastPlayed = lastPlayed;
    lastPlayed = sound;
}

keys.forEach(key => key.addEventListener('transitionend', removeTransition));
keys.forEach(key => key.addEventListener('click', playVoice));
window.addEventListener('keydown', playVoice);
