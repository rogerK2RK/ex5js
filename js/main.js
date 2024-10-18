/** Exercice 1 **/
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



/** Exercice 2 **/

const webcamSelect = document.getElementById('webcamSelect');
const selectWebcamBtn = document.getElementById('selectWebcam');
const videoElement = document.getElementById('videoElement');
const capturePhotoBtn = document.getElementById('capturePhoto');
const capturedImage = document.getElementById('capturedImage');
const saveImageBtn = document.getElementById('saveImage');

let currentStream = null;
let currentDeviceId = null;
let capturedImageDataUrl = '';

// Fonction pour obtenir la liste des périphériques vidéo (webcams)
async function getCameras() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        webcamSelect.innerHTML = videoDevices.map((device, index) => {
            return `<option value="${device.deviceId}">${device.label || `Webcam ${index + 1}`}</option>`;
        }).join('');

        if (videoDevices.length > 0) {
            currentDeviceId = videoDevices[0].deviceId;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des périphériques :', error);
    }
}

// Fonction pour démarrer le flux vidéo à partir de la webcam sélectionnée
async function startWebcam(deviceId) {
    const constraints = {
        video: {
            deviceId: deviceId ? { exact: deviceId } : undefined
        }
    };
    try {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
        }
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = stream;
        currentStream = stream;
    } catch (error) {
        console.error('Erreur lors du démarrage de la webcam :', error);
    }
}

// Lors de la sélection d'une webcam et du clic sur "Valider"
selectWebcamBtn.addEventListener('click', () => {
    const selectedDeviceId = webcamSelect.value;
    if (selectedDeviceId) {
        startWebcam(selectedDeviceId);
    }
});

// Fonction pour capturer une photo à partir du flux vidéo
capturePhotoBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    // console.log(canvas);
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Convertir l'image du canvas en URL base64 pour l'élément image
    capturedImageDataUrl = canvas.toDataURL('image/png');
    capturedImage.src = capturedImageDataUrl;
    capturedImage.style.display = 'block';
    saveImageBtn.style.display = 'block';
});

// Fonction pour sauvegarder l'image capturée
saveImageBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = capturedImageDataUrl;
    link.download = 'webcam_capture.png';
    link.click(); 
});


getCameras();

