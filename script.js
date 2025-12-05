const grilleInitiale = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

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
        if (!verifierLigne(grille, i)) {
            return false;
        }
        if (!verifierColonne(grille, i)) {
            return false;
        }
    }
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            if (!verifierRegion(grille, i, j)) {
                return false;
            }
        }
    }
    return true;
}

const body = document.body;
const checkButton = document.getElementById('check-button');

checkButton.addEventListener('click', () => {
    const grilleJoueur = recupererGrilleJoueur();

    const solutionValide = verifierGrilleComplete(grilleJoueur);

    if (solutionValide) {
        body.style.backgroundColor = '#d4edda'; 
        checkButton.textContent = 'BRAVO!!';
        checkButton.style.backgroundColor = '#28a745';
        checkButton.disabled = true;
    } else {
        body.style.backgroundColor = '#f8d7da';
        checkButton.textContent = 'Dommage...';
        checkButton.style.backgroundColor = '#dc3545';
    }
    if (!solutionValide) {
        setTimeout(() => {
            body.style.backgroundColor = '#f4f4f4'; 
            checkButton.textContent = 'Vérifier ma solution';
            checkButton.style.backgroundColor = '#28a745';
        }, 2000); 
    }
});

afficherGrille(grilleInitiale);