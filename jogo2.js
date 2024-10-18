const cardImages = [
    'img/macarão.jpeg',
    'img/manteiga.jpeg',
    'img/OVo.jpeg',
    'img/pão.jpeg',
    'img/chocolate.jpeg',
    'img/carne.jpeg',
    'img/feijão.jpeg',
    'img/macaraorespo.jpeg',
    'img/manteigarespo.jpeg',
    'img/ovoarespo.jpeg',
    'img/paorespo.jpeg',
    'img/chocolatearespo.jpeg',
    'img/carnearespo.jpeg',
    'img/feijãoarespo.jpeg',
];

let gameCards = [...cardImages, ...cardImages];
let firstCard, secondCard;
let lockBoard = false;
let matchedCards = 0;

// Embaralhar as cartas
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Criar o tabuleiro
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Limpar o tabuleiro ao reiniciar o jogo
    shuffle(gameCards).forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        const img = document.createElement('img');
        img.src = image;
        img.alt = 'Imagem da Carta'; // Adicionando alt para acessibilidade
        card.appendChild(img);

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);

        // Verificar se a imagem foi carregada
        img.onload = () => console.log(`${image} carregada com sucesso.`);
        img.onerror = () => console.error(`Erro ao carregar a imagem: ${image}`);
    });
}

// Virar a carta
function flipCard() {
    if (lockBoard || this.classList.contains('flipped')) return;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }
    
    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

// Checar se as cartas combinam
function checkForMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        matchedCards += 2;
        resetBoard();
        if (matchedCards === gameCards.length) {
            alert('Você ganhou!');
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

// Resetar o tabuleiro
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Reiniciar o jogo
document.getElementById('reset-button').addEventListener('click', () => {
    matchedCards = 0;
    createBoard();
});

// Iniciar o jogo
createBoard();
