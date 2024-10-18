import { getRegions, getDepartmentsFromRegion, getCitiesFromDepartment } from './geoApi.js';

const regtList = document.querySelector('#region-list');
const departList = document.querySelector('#depart-list');
const comList = document.querySelector('#commune-list');
const btnShow = document.querySelector('#showCommunes');

let codeDepart;

// Fonction pour afficher la liste des régions
async function displayRegions() {
    try {
        const regions = await getRegions();
        regtList.innerHTML = regions.map(region => 
            `<option value="${region.code}">${region.nom}</option>`
        ).join('');
    } catch (error) {
        console.error('Erreur lors de l\'affichage des régions :', error);
    }
}

// Fonction pour afficher les départements d'une région
async function displayDepartments(regionCode) {
    try {
        const departments = await getDepartmentsFromRegion(regionCode);
        departList.innerHTML = departments.map(departement =>
            `<option value="${departement.code}">${departement.nom}</option>`
        ).join('');
    } catch (error) {
        console.error('Erreur lors de l\'affichage des départements :', error);
    }
}

// Fonction pour afficher les communes d'un département
async function displayCommunes(departmentCode) {
    try {
        const communes = await getCitiesFromDepartment(departmentCode);
        comList.innerHTML = communes.map(commune => 
            `<li>${commune.nom} (${commune.population})</li>`
        ).join('');
    } catch (error) {
        console.error('Erreur lors de l\'affichage des communes :', error);
    }
}

// Événement lors de la sélection d'une région
regtList.addEventListener('change', (e) => {
    const selectedRegion = e.target.value;
    displayDepartments(selectedRegion);
});

// Événement lors du clic sur le bouton pour afficher les communes
btnShow.addEventListener('click', () => {
    const selectedDepart = departList.value;
    if (selectedDepart) {
        displayCommunes(selectedDepart);
    } else {
        console.log('Aucun département sélectionné.');
    }
});

// Charger la liste des régions au démarrage
displayRegions();