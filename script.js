function login(role) {
    let password = prompt("Bitte Passwort eingeben:");

    if (role === 'freundin') {
        if (password.toLowerCase().includes('michelle')) {
            showWelcome("Willkommen meine liebe Michelle!");
        } else {
            alert("Falsches Passwort.");
        }
    } else if (role === 'besterfreund') {
        if (password.toLowerCase().includes('daniel')) {
            showWelcome("Willkommen mein bester Bro Daniel!");
        } else {
            alert("Falsches Passwort.");
        }
    } else if (role === 'admin') {
        if (password.toLowerCase() === 'bosna') {
            showWelcome("Willkommen Boss Irsan!");
        } else {
            alert("Falsches Passwort.");
        }
    } else if (role === 'feind') {
        fakeErrorAndLogIP();
    }
}

function showWelcome(message) {
    document.querySelector('.login-container').classList.add('hidden');
    const app = document.getElementById('app');
    app.classList.remove('hidden');
    document.getElementById('welcome').innerText = message;
    document.getElementById('content').innerHTML = "<p>Deine Abenteuerkarte und Daten erscheinen hier bald!</p>";
}

function fakeErrorAndLogIP() {
    alert("Zugriff verweigert! Deine IP wurde gespeichert.");
    // Simulierter Log (echtes Logging folgt später mit API + Verschlüsselung!)
    console.log("Feindversuch geloggt: " + new Date().toISOString());
}