let map;
let userMarker;
let checkpoints = [];

function login() {
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim().toLowerCase();

    if ((username.includes("daniel") && password.includes("daniel")) ||
        (username.includes("michele") && password.includes("michele")) ||
        (username.includes("irsan") && password.includes("bosna"))) {
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('dashboard').classList.add('active');
        initializeMap();
    } else {
        alert("Zutritt verweigert, Feind erkannt.");
    }
}

function initializeMap() {
    map = L.map('map').setView([45.8, 15.97], 6); // Start über Kroatien/Bosnien, schöner Überblick

    L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        subdomains:['mt0','mt1','mt2','mt3'],
        maxZoom: 20,
    }).addTo(map);
}

function updateGPS() {
    const vehicle = document.getElementById('vehicle').value;

    if (!navigator.geolocation) {
        alert("GPS wird nicht unterstützt.");
        return;
    }

    // Ladebalken Animation starten
    const bar = document.getElementById('loading-bar');
    bar.style.width = "0%";
    setTimeout(() => {
        bar.style.width = "100%";
    }, 50);

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;

        if (userMarker) {
            userMarker.remove();
        }

        let iconUrl = getVehicleIcon(vehicle);
        const icon = L.icon({
            iconUrl: iconUrl,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
        });

        userMarker = L.marker([latitude, longitude], { icon: icon }).addTo(map)
            .bindPopup(`🚍 Fahrzeug: ${vehicle}<br>📍 Position aktualisiert.`).openPopup();

        map.setView([latitude, longitude], 14);

        // Historie aktualisieren
        const checkpoint = {
            vehicle,
            lat: latitude,
            lng: longitude,
            time: new Date().toLocaleTimeString()
        };
        checkpoints.push(checkpoint);
        renderHistory();

    }, () => {
        alert("GPS Abruf fehlgeschlagen.");
    });
}

function getVehicleIcon(vehicle) {
    switch (vehicle) {
        case "bus":
            return "https://cdn-icons-png.flaticon.com/512/1475/1475975.png";
        case "auto":
            return "https://cdn-icons-png.flaticon.com/512/633/633759.png";
        case "bahn":
            return "https://cdn-icons-png.flaticon.com/512/944/944042.png";
        case "flugzeug":
            return "https://cdn-icons-png.flaticon.com/512/681/681494.png";
        default:
            return "https://cdn-icons-png.flaticon.com/512/854/854878.png";
    }
}

function renderHistory() {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = "";
    checkpoints.forEach((cp, index) => {
        historyDiv.innerHTML += `<div>#${index + 1} - ${cp.vehicle.toUpperCase()} - ${cp.time}</div>`;
    });
}