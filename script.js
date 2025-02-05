const normalText = document.getElementById('normalText');
const encryptedText = document.getElementById('encryptedText');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const encryptedResult = document.getElementById('encryptedResult');
const decryptedResult = document.getElementById('decryptedResult');
const backgroundMusic = document.getElementById('backgroundMusic');
const stopMusicBtn = document.getElementById('stopMusicBtn');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');

const codeMap = {
    'A': 'rrr', 'B': 'rrs', 'C': 'rsr', 'D': 'rss', 'E': 'srr',
    'F': 'srs', 'G': 'ssr', 'H': 'sss', 'I': 'rrrr', 'J': 'rrrs',
    'K': 'rrsr', 'L': 'rrss', 'M': 'rsrr', 'N': 'rsrs', 'O': 'rssr',
    'P': 'rsss', 'Q': 'srrr', 'R': 'srrs', 'S': 'srss', 'T': 'ssss',
    'U': 'rrrrr', 'V': 'rrrrs', 'W': 'rrrsr', 'X': 'rrrss', 'Y': 'rrsrr',
    'Z': 'rrsrs'
};

const reverseCodeMap = Object.fromEntries(Object.entries(codeMap).map(([k, v]) => [v, k]));

// Criptografar
encryptBtn.addEventListener('click', () => {
    const text = normalText.value.toUpperCase();
    let encrypted = '';
    for (let char of text) {
        if (char === ' ') {
            encrypted += ' ';
        } else if (codeMap[char]) {
            encrypted += codeMap[char] + ' ';
        }
    }
    encryptedResult.textContent = encrypted.trim();
});

// Descriptografar
decryptBtn.addEventListener('click', () => {
    const encrypted = encryptedText.value.trim();
    const codes = encrypted.split(' ');
    let decrypted = '';
    for (let code of codes) {
        if (code === '') {
            decrypted += ' ';
        } else if (reverseCodeMap[code]) {
            decrypted += reverseCodeMap[code];
        }
    }
    decryptedResult.textContent = decrypted;
});

// Controle da música
stopMusicBtn.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
    } else {
        backgroundMusic.pause();
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
    }
});

// Iniciar música de fundo
backgroundMusic.play();
playIcon.style.display = 'none';
pauseIcon.style.display = 'inline';