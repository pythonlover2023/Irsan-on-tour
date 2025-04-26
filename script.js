function login() {
    const name = document.getElementById('nameInput').value.toLowerCase();

    if (name.includes("michelle")) {
        alert("Willkommen, vertrauenswürdige Freundin!");
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('mapSection').style.display = 'block';
        document.getElementById('commentSection').style.display = 'block';
    } else if (name.includes("daniel")) {
        alert("Willkommen, bester Freund!");
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('mapSection').style.display = 'block';
        document.getElementById('commentSection').style.display = 'block';
    } else {
        alert("Feind erkannt! Deine IP wird geloggt.");
        logEnemy();
    }
}

function logEnemy() {
    const now = new Date();
    const log = `Feind entdeckt am ${now.toLocaleString()}`;
    console.log(log);
    // Hier könnte später ein GitHub Upload oder lokales speichern kommen
}

function submitComment() {
    const comment = document.getElementById('commentInput').value;
    if (comment.trim() !== "") {
        const commentsDiv = document.getElementById('comments');
        const newComment = document.createElement('p');
        newComment.textContent = comment;
        commentsDiv.appendChild(newComment);
        document.getElementById('commentInput').value = "";
    }
}