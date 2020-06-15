//initialisation des variables
let coordonneeX = Math.floor(Math.random() * 8);
let coordonneeY = Math.floor(Math.random() * 8);
var idTresor = String(coordonneeX) + '-' + String(coordonneeY);    
let compteur = 0;                                                       
let monTableau = Tableau2D(8, 8);                                       
let tableau = "<table id='imagecarte'>";
let commentaire = "Trouve le trésor";                   

//fonction pour renvoyer le tableau
function Tableau2D(x, y) {
    var array2D = new Array(x);
    for (var i = 0; i < array2D.length; i++) {
        array2D[i] = new Array(y);
    }
    return array2D;
}

//fonction pour vérifier chargement complet de la page avant d'utiliser la fonction initTab
window.onload = function() { initTab(); }

//fonction pour créer le tableau puis définir l'emplacement du trésor
function initTab() {
    monTableau[coordonneeX][coordonneeY] = "";

    for (y = 0; y < monTableau.length; y++){
        tableau = tableau + "<tr>";
            for (i = 0; i < monTableau.length; i++){
                if (monTableau[y][i] != monTableau[coordonneeX][coordonneeY]){
                    monTableau[y][i] = " ";
                }
                tableau = tableau + "<td id=" + String(y) + "-" + String(i) + " onclick='choix(this.id)'; >" + monTableau[y][i] + "</td>";  //permet de donner les id pour chaques cases du tableau
            }
        tableau = tableau + "</tr>";
    }
    tableau = tableau + "</tr></table>"
    document.getElementById("emplacementTable").innerHTML = tableau;
}

//fonction pour récupérer id de la case séléctionnée et comparer le résultat
function choix(id){
    caseTable = document.getElementById(id);
    //si clique sur le trésor
    if (id == idTresor){
        
        caseTable.setAttribute('class', 'bonnecase');        //changement de la couleur de la case
        console.log("Gagné");

        for (y = 0; y < monTableau.length; y++){
            for (i = 0; i < monTableau.length; i++){
                let caseId = y + "-" + i;
                document.getElementById(caseId).setAttribute('onclick', '');        //boucle permettant de stopper le jeu quand le trésor a été trouvé
            }        
        }
        compteur++;
        afficherCompteur(compteur);
        afficherVictoire(); 
    
    //si clique sur la bonne ligne
    } else if (id == coordonneeX + "-0" || id == coordonneeX + "-1" || id == coordonneeX + "-2" || id == coordonneeX + "-3" || id == coordonneeX + "-4" || id == coordonneeX + "-5" || id == coordonneeX + "-6" || id == coordonneeX + "-7"){
        
        caseTable.setAttribute('class', 'bonneligne');       //changement de la couleur de la case
        caseTable.setAttribute('onclick', '');          //désactivation de la case clickable 
        compteur++;
        afficherCompteur(compteur);
        afficherCommentaire("continue, tu y es presque");

    //si clique sur la bonne colonne
    } else if (id == "0-" + coordonneeY || id == "1-" + coordonneeY || id == "2-" + coordonneeY || id == "3-" + coordonneeY || id == "4-" + coordonneeY || id == "5-" + coordonneeY || id == "6-" + coordonneeY || id == "7-" + coordonneeY){

        caseTable.setAttribute('class', 'colonne');     
        caseTable.setAttribute('onclick', '');
        compteur++;
        afficherCompteur(compteur);
        afficherCommentaire("continue, tu y es presque");

    //si clique sur une mauvaise case
    } else {

        caseTable.setAttribute('class', 'mauvaisecase');
        caseTable.setAttribute('onclick', '');   
        compteur++;
        afficherCompteur(compteur);
        afficherCommentaire("essaie encore");
    }
}

//afficher les commentaires
function afficherCommentaire(message){

    commentaire = message + commentaire;

    document.getElementById("emplacementCommentaires").innerHTML = commentaire;
}

//afficher le compteur
function afficherCompteur(valeur){
    document.getElementById("compte").innerHTML = valeur;
}

//stoppage du jeu
function afficherVictoire(){
    message = "super, tu as trouvé le trésor" + compteur
    document.getElementById("emplacementCommentaires").innerHTML = message;
}