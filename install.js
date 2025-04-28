document.getElementById('installBtn').addEventListener('click', function () {
    this.style.display = 'none';
    document.getElementById('loader').style.display = 'block';
    
    // Simulation der Dateianlage
    setTimeout(() => {
        alert('Baustelle abgeschlossen, Bruder! Alles ready für deinen Trip!');
    }, 4000);

    // Hier normalerweise: Code für echte Datei- und Struktur-Generierung
    // -> Begrenzung, da Browser keine Dateisystemrechte direkt hat.
    // -> Alternative: Download vorbereiten später
});