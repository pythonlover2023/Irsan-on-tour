async function setStatus(status) {
  const now = new Date().toLocaleString();
  const entry = `${now}: ${status}`;

  let timeline = localStorage.getItem('timeline') || '';
  timeline += entry + '\n';
  localStorage.setItem('timeline', timeline);

  alert("Status gesetzt!");
}

function customStatus() {
  const custom = document.getElementById('customStatus').value;
  if (custom.trim() !== "") {
    setStatus(custom);
  }
}

function updateLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const now = new Date().toLocaleString();
      const locationEntry = `${now}: GPS [${position.coords.latitude}, ${position.coords.longitude}]`;
      
      let timeline = localStorage.getItem('timeline') || '';
      timeline += locationEntry + '\n';
      localStorage.setItem('timeline', timeline);

      alert("GPS-Daten aktualisiert!");
    });
  } else {
    alert("GPS nicht verfügbar.");
  }
}

window.onload = function() {
  if (document.getElementById('timeline')) {
    const timeline = localStorage.getItem('timeline') || 'Noch keine Einträge.';
    document.getElementById('timeline').innerText = timeline;
  }
};