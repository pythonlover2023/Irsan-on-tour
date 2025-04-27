let map;
let gpsCollected = false;

// Initialisiere Map
function initMap() {
    map = L.map('mapContainer').setView([44.2264, 17.9077], 13); // Travnik Startpunkt

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 18,
    }).addTo(map);
}

// GPS-Funktion mit Progressbar
function updateGPS() {
    let progressBar = document.getElementById('gpsProgress');
    progressBar.style.width = '0%';
    progressBar.innerText = 'Starte GPS...';

    if (!navigator.geolocation) {
        progressBar.innerText = 'GPS nicht unterstützt!';
        return;
    }

    let collectedPositions = [];

    let gpsInterval = setInterval(() => {
        if (collectedPositions.length >= 5) {
            clearInterval(gpsInterval);
            gpsCollected = true;

            let avgLat = collectedPositions.reduce((sum, pos) => sum + pos.coords.latitude, 0) / collectedPositions.length;
            let avgLon = collectedPositions.reduce((sum, pos) => sum + pos.coords.longitude, 0) / collectedPositions.length;

            progressBar.style.width = '100%';
            progressBar.innerText = 'GPS aktualisiert!';

            updateMapPosition(avgLat, avgLon);
            addChronikEntry(`GPS-Update: Du bist aktuell bei [${avgLat.toFixed(4)}, ${avgLon.toFixed(4)}] unterwegs.`);

        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                collectedPositions.push(position);

                let percent = (collectedPositions.length / 5) * 100;
                progressBar.style.width = `${percent}%`;
                progressBar.innerText = `Sammle GPS... ${percent.toFixed(0)}%`;
            }, (error) => {
                progressBar.innerText = 'Fehler beim GPS Empfang!';
                clearInterval(gpsInterval);
            });
        }
    }, 1000);
}

// Map aktualisieren
function updateMapPosition(lat, lon) {
    if (map) {
        map.setView([lat, lon], 13);
        L.marker([lat, lon]).addTo(map)
            .bindPopup('Hier bist du gerade, Bruder!')
            .openPopup();
    }
}

// Chronik-Eintrag hinzufügen
function addChronikEntry(text) {
    let chronik = document.getElementById('chronik');
    let entry = document.createElement('div');
    entry.className = 'entry';
    entry.innerHTML = `<p>${text}</p>`;
    chronik.prepend(entry);
}

// Auto Map laden
document.addEventListener('DOMContentLoaded', function () {
    initMap();

    document.getElementById('updateGPSBtn').addEventListener('click', updateGPS);
});