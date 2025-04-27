// Login Funktion
function login() {
    const username = document.getElementById('username').value.trim().toLowerCase();

    if (username === "irsan" || username === "daniel" || username === "michele") {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        initMap();
    } else {
        alert("Feind erkannt, Bruda!");
    }
}

// Map und GPS Funktionalität
let map;

function initMap() {
    map = L.map('mapContainer').setView([44.2264, 17.9078], 8); // Bosnien Standardansicht

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);
}

// GPS aktualisieren
document.getElementById('updateGPSBtn').addEventListener('click', () => {
    const progressBar = document.getElementById('gpsProgress');
    progressBar.style.width = '0%';

    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(interval);
            addChronikEintrag("GPS-Daten aktualisiert: Bus fliegt durch Bosna!");
        }
    }, 300);
});

// Chronik-Eintrag hinzufügen
function addChronikEintrag(text) {
    const chronik = document.getElementById('chronik');
    const entry = document.createElement('p');
    entry.textContent = text;
    chronik.appendChild(entry);
}