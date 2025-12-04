
const grilleInitiale = [
    // Ligne 1
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    // Ligne 2
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    // Ligne 3
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    // Ligne 4
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    // Ligne 5
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    // Ligne 6
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    // Ligne 7
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    // Ligne 8
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    // Ligne 9
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const grilleHTML = document.getElementById('sudoku-grid');

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
            }

            ligneDiv.appendChild(caseInput);
        }

        grilleHTML.appendChild(ligneDiv);
    }
}

afficherGrille(grilleInitiale);