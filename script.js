const GRILLES_SOLUTIONS = [
    [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ],
    [
        [1, 5, 9, 7, 2, 4, 8, 6, 3],
        [4, 6, 7, 8, 3, 5, 2, 9, 1],
        [2, 8, 3, 1, 6, 9, 7, 5, 4],
        [6, 9, 4, 5, 8, 7, 3, 1, 2],
        [7, 2, 5, 4, 1, 3, 6, 8, 9],
        [3, 1, 8, 2, 9, 6, 4, 7, 5],
        [5, 7, 2, 9, 4, 8, 1, 3, 6],
        [8, 3, 1, 6, 5, 2, 9, 4, 7],
        [9, 4, 6, 3, 7, 1, 5, 2, 8]
    ],
    [
        [2, 8, 3, 5, 1, 9, 7, 4, 6],
        [9, 6, 4, 8, 7, 3, 5, 2, 1],
        [5, 1, 7, 6, 2, 4, 9, 3, 8],
        [1, 5, 6, 7, 4, 2, 3, 8, 9],
        [4, 2, 9, 3, 8, 6, 1, 7, 5],
        [3, 7, 8, 1, 9, 5, 2, 6, 4],
        [8, 9, 5, 4, 3, 7, 6, 1, 2],
        [7, 4, 2, 9, 6, 1, 8, 5, 3],
        [6, 3, 1, 2, 5, 8, 4, 9, 7]
    ],
    [
        [8, 9, 2, 7, 3, 5, 4, 6, 1],
        [6, 5, 3, 8, 1, 4, 7, 9, 2],
        [7, 1, 4, 9, 2, 6, 5, 8, 3],
        [9, 5, 6, 3, 8, 2, 1, 4, 7],
        [4, 8, 5, 6, 7, 2, 3, 1, 9],
        [3, 2, 1, 4, 5, 9, 7, 8, 6],
        [5, 6, 3, 1, 9, 8, 2, 7, 4],
        [7, 3, 8, 2, 4, 7, 6, 5, 9],
        [2, 4, 9, 5, 6, 8, 1, 3, 7]
    ]
];

const NOMBRE_DE_CASES_A_CACHER = 45;

function genererGrilleDepart(solutionGrille, casesACacher) {
    let grilleDepart = solutionGrille.map(arr => [...arr]);
    let compteCaches = 0;
    
    while (compteCaches < casesACacher) {
        let ligne = Math.floor(Math.random() * 9);
        let colonne = Math.floor(Math.random() * 9);
        
        if (grilleDepart[ligne][colonne] !== 0) {
            grilleDepart[ligne][colonne] = 0;
            compteCaches++;
        }
    }
    return grilleDepart;
}

function choisirSolutionAleatoire() {
    const indexAleatoire = Math.floor(Math.random() * GRILLES_SOLUTIONS.length);
    return GRILLES_SOLUTIONS[indexAleatoire].map(arr => [...arr]);
}

const solutionChoisie = choisirSolutionAleatoire();
const grilleInitiale = genererGrilleDepart(solutionChoisie, NOMBRE_DE_CASES_A_CACHER);
const grilleHTML = document.getElementById('sudoku-grid');

function validerSaisie(event) {
    let input = event.target;
    let valeur = input.value;
    
    valeur = valeur.replace(/[^1-9]/g, '');
    
    if (valeur.length > 1) {
        valeur = valeur.slice(0, 1);
    }
    
    if (valeur === '0') {
        valeur = '';
    }
    
    input.value = valeur;
}

function afficherGrille(grille) {
    grilleHTML.innerHTML = '';

    for (let i = 0; i < 9; i++) { 
        const ligneDiv = document.createElement('div');
        ligneDiv.classList.add('sudoku-row');
        
        if ((i + 1) % 3 === 0 && i !== 8) {
            ligneDiv.classList.add('block-separator-bottom');
        }

        for (let j = 0; j < 9; j++) { 
            const chiffre = grille[i][j]; 
            const caseInput = document.createElement('input');
            caseInput.type = 'text'; 
            caseInput.maxLength = 1;
            caseInput.dataset.row = i; 
            caseInput.dataset.col = j; 
            
            if ((j + 1) % 3 === 0 && j !== 8) {
                caseInput.classList.add('block-separator-right');
            }

            if (chiffre !== 0) {
                caseInput.value = chiffre;
                caseInput.readOnly = true; 
                caseInput.classList.add('pre-filled'); 
            } 
            else {
                caseInput.classList.add('player-input');
                caseInput.addEventListener('input', validerSaisie); 
            }

            ligneDiv.appendChild(caseInput);
        }
        grilleHTML.appendChild(ligneDiv);
    }
}

function recupererGrilleJoueur() {
    const grilleJoueur = [];
    for (let i = 0; i < 9; i++) {
        grilleJoueur[i] = new Array(9).fill(0);
    }

    const inputs = document.querySelectorAll('#sudoku-grid input');

    inputs.forEach(input => {
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        const valeur = input.value.trim();
        let chiffre = 0;
        
        if (valeur.length === 1 && !isNaN(parseInt(valeur))) {
            const num = parseInt(valeur);
            if (num >= 1 && num <= 9) {
                chiffre = num;
            }
        }
        
        if (row >= 0 && row < 9 && col >= 0 && col < 9) {
            grilleJoueur[row][col] = chiffre;
        }
    });

    return grilleJoueur;
}

function verifierLigne(grille, indexLigne) {
    const ligne = grille[indexLigne];
    const chiffresTrouves = new Set();

    for (const chiffre of ligne) {
        if (chiffre !== 0) {
            if (chiffresTrouves.has(chiffre)) {
                return false;
            }
            chiffresTrouves.add(chiffre);
        }
    }
    return true;
}

function verifierColonne(grille, indexColonne) {
    const chiffresTrouves = new Set();
    for (let i = 0; i < 9; i++) {
        const chiffre = grille[i][indexColonne];
        if (chiffre !== 0) {
            if (chiffresTrouves.has(chiffre)) {
                return false;
            }
            chiffresTrouves.add(chiffre);
        }
    }
    return true;
}

function verifierRegion(grille, startLigne, startColonne) {
    const chiffresTrouves = new Set();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const ligne = startLigne + i;
            const colonne = startColonne + j;
            const chiffre = grille[ligne][colonne];
            
            if (chiffre !== 0) {
                if (chiffresTrouves.has(chiffre)) {
                    return false;
                }
                chiffresTrouves.add(chiffre);
            }
        }
    }
    return true;
}

function verifierGrilleComplete(grille) {
    for (let i = 0; i < 9; i++) {
        if (!verifierLigne(grille, i)) return false;
        if (!verifierColonne(grille, i)) return false;
    }
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            if (!verifierRegion(grille, i, j)) return false;
        }
    }
    return true;
}

function marquerGrille(grille) {
    const toutesLesCases = document.querySelectorAll('#sudoku-grid input');
    toutesLesCases.forEach(input => {
        input.classList.remove('correct', 'incorrect');
    });

    for (let i = 0; i < 9; i++) {
        const ligneValide = verifierLigne(grille, i);
        const colonneValide = verifierColonne(grille, i);

        const ligneInputs = document.querySelectorAll(`[data-row="${i}"]`);
        ligneInputs.forEach((input, j) => {
            const chiffre = grille[i][j];
            if (chiffre !== 0) {
                if (!ligneValide) {
                    input.classList.add('incorrect');
                } else {
                    input.classList.add('correct');
                }
            }
        });

        const colonneInputs = document.querySelectorAll(`[data-col="${i}"]`);
        colonneInputs.forEach((input, j) => {
            const indexLigne = parseInt(input.dataset.row);
            const chiffre = grille[indexLigne][i];
            
            if (chiffre !== 0) {
                if (!colonneValide) {
                    input.classList.add('incorrect');
                } else if (ligneValide) {
                    input.classList.add('correct');
                }
            }
        });
    }
}

const body = document.body;
const checkButton = document.getElementById('check-button');

checkButton.addEventListener('click', () => {
    const grilleJoueur = recupererGrilleJoueur();

    marquerGrille(grilleJoueur); 
    
    const solutionValide = verifierGrilleComplete(grilleJoueur);

    if (solutionValide) {
        
        body.style.backgroundColor = '#d4edda'; 
        checkButton.textContent = 'BRAVO!!';
        checkButton.style.backgroundColor = '#28a745';
        checkButton.disabled = true; 

        let replayButton = document.getElementById('replay-button');
        if (!replayButton) {
            replayButton = document.createElement('button');
            replayButton.id = 'replay-button';
            replayButton.textContent = 'Rejouer ?';
            
            replayButton.addEventListener('click', () => {
                window.location.reload();
            });

            checkButton.parentNode.appendChild(replayButton);
        }
    } else {
      
        body.style.backgroundColor = '#f8d7da'; 
        checkButton.textContent = 'Dommage...';
        checkButton.style.backgroundColor = '#dc3545';
     
        setTimeout(() => {
            body.style.backgroundColor = '#f4f4f4'; 
            checkButton.textContent = 'Vérifier ma solution';
            checkButton.style.backgroundColor = '#28a745';
        }, 2000); 
    }
});

afficherGrille(grilleInitiale);