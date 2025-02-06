const normalText = document.getElementById('normalText');
const encryptedText = document.getElementById('encryptedText');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const encryptedResult = document.getElementById('encryptedResult');
const decryptedResult = document.getElementById('decryptedResult');
const copyEncryptedBtn = document.getElementById('copyEncryptedBtn');
const copyDecryptedBtn = document.getElementById('copyDecryptedBtn');
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

// Função para criptografar
function encrypt(text) {
    return text
        .toUpperCase()
        .split('')
        .map(char => {
            if (char === ' ') {
                return '  '; // Dois espaços para separar palavras
            } else if (/[À-Úà-ú]/.test(char)) {
                return char; // Mantém letras com acento
            } else if (codeMap[char]) {
                return codeMap[char]; // Criptografa letras mapeadas
            } else {
                return char; // Mantém números e outros caracteres
            }
        })
        .join(' '); // Um espaço para separar letras
}

// Função para descriptografar
function decrypt(encrypted) {
    return encrypted
        .split('  ') // Divide por dois espaços (separação de palavras)
        .map(word =>
            word
                .split(' ') // Divide por um espaço (separação de letras)
                .map(code => reverseCodeMap[code] || code) // Descriptografa ou mantém o código
                .join('')
        )
        .join(' '); // Junta as palavras com um espaço
}

// Criptografar
encryptBtn.addEventListener('click', () => {
    const text = normalText.value;
    const encrypted = encrypt(text);
    encryptedResult.textContent = encrypted;
    encryptedText.value = encrypted;
});

// Descriptografar
decryptBtn.addEventListener('click', () => {
    const encrypted = encryptedText.value;
    const decrypted = decrypt(encrypted);
    decryptedResult.textContent = decrypted;
    normalText.value = decrypted;
});

// Copiar texto criptografado
copyEncryptedBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(encryptedResult.textContent);
    alert('Texto criptografado copiado!');
});

// Copiar texto descriptografado
copyDecryptedBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(decryptedResult.textContent);
    alert('Texto descriptografado copiado!');
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
