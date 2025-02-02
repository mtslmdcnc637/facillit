const sons = {
    virar: new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'),
    match: new Audio('data:audio/wav;base64,UklGRloAAABXQVZFZm10IBAAAAABAAEARKwAABCxAgAEABAAZGF0YQ'),
    vitoria: new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU')
};

let cartasViradas = [];
let movimentos = 0;
let paresRestantes = 0;

function criarCarta(emoji) {
    const div = document.createElement('div');
    div.className = 'carta';
    
    const inner = document.createElement('div');
    inner.className = 'carta-inner';
    
    const frente = document.createElement('div');
    frente.className = 'frente';
    frente.textContent = '?';
    
    const verso = document.createElement('div');
    verso.className = 'verso';
    verso.textContent = emoji;
    
    inner.appendChild(frente);
    inner.appendChild(verso);
    div.appendChild(inner);
    
    div.addEventListener('click', () => virarCarta(div));
    return div;
}

function virarCarta(carta) {
    if (!carta.classList.contains('virada') && cartasViradas.length < 2) {
        sons.virar.play();
        carta.classList.add('virada');
        cartasViradas.push(carta);

        if (cartasViradas.length === 2) {
            movimentos++;
            document.getElementById('contador').textContent = `Movimentos: ${movimentos}`;
            setTimeout(verificarPar, 800);
        }
    }
}

function verificarPar() {
    const [carta1, carta2] = cartasViradas;
    const emoji1 = carta1.querySelector('.verso').textContent;
    const emoji2 = carta2.querySelector('.verso').textContent;

    if (emoji1 === emoji2) {
        sons.match.play();
        carta1.classList.add('encontrada');
        carta2.classList.add('encontrada');
        paresRestantes--;
        
        if (paresRestantes === 0) {
            sons.vitoria.play();
            document.getElementById('tela-vitoria').classList.remove('escondido');
            document.getElementById('movimentos-final').textContent = movimentos;
        }
    } else {
        carta1.classList.remove('virada');
        carta2.classList.remove('virada');
    }
    
    cartasViradas = [];
}

function reiniciarJogo() {
    const jogo = document.getElementById('jogo');
    jogo.innerHTML = '';
    cartasViradas = [];
    movimentos = 0;
    document.getElementById('contador').textContent = 'Movimentos: 0';
    document.getElementById('tela-vitoria').classList.add('escondido');
    iniciarJogo();
}

function atualizarGrade() {
    const dificuldade = document.getElementById('dificuldade').value;
    const jogo = document.getElementById('jogo');
    jogo.style.gridTemplateColumns = `repeat(${Math.ceil(dificuldade * 2 / 4)}, 1fr)`;
}

function iniciarJogo() {
    const dificuldade = parseInt(document.getElementById('dificuldade').value);
    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'].slice(0, dificuldade);
    paresRestantes = dificuldade;
    const cartas = [...emojis, ...emojis];
    
    atualizarGrade();
    embaralhar(cartas).forEach(emoji => {
        document.getElementById('jogo').appendChild(criarCarta(emoji));
    });
}

function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Event Listeners
document.getElementById('reiniciar').addEventListener('click', reiniciarJogo);
document.getElementById('dificuldade').addEventListener('change', reiniciarJogo);
document.getElementById('jogar-novamente').addEventListener('click', reiniciarJogo);

// Iniciar
iniciarJogo();