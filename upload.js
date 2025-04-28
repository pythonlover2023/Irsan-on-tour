// upload.js

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const commentInput = document.getElementById('commentInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const preview = document.getElementById('preview');
    const autoTags = document.getElementById('autoTags');
    const timeline = document.getElementById('timeline');

    uploadBtn.addEventListener('click', () => {
        const file = fileInput.files[0];
        const comment = commentInput.value;
        const description = descriptionInput.value;

        if (!file) {
            alert('Bruda, wähl erst mal ne Datei aus!');
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const fileURL = e.target.result;
            preview.innerHTML = '';

            if (file.type.startsWith('image/')) {
                const img = new Image();
                img.src = fileURL;
                img.onload = () => {
                    const watermarkedImage = addWatermark(img, 'Travnik 2025');
                    preview.appendChild(watermarkedImage);
                    addToTimeline('Bild', watermarkedImage.src, comment, description);
                    autoTagging(description);
                };
            } else if (file.type.startsWith('audio/')) {
                const audio = document.createElement('audio');
                audio.controls = true;
                audio.src = fileURL;
                preview.appendChild(audio);
                // Für Audio später Watermark einbauen (advanced)
                addToTimeline('Audio', fileURL, comment, description);
                autoTagging(description);
            } else {
                alert('Nur Bilder oder Audio, Bruda!');
            }
        };

        reader.readAsDataURL(file);
    });

    function addWatermark(img, watermarkText) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        ctx.font = '20px Arial';
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.textAlign = 'right';
        ctx.fillText(watermarkText, canvas.width - 20, canvas.height - 20);

        const newImg = new Image();
        newImg.src = canvas.toDataURL('image/png');
        return newImg;
    }

    function addToTimeline(type, src, comment, description) {
        const now = new Date();
        const timestamp = now.toLocaleString();

        const entry = document.createElement('div');
        entry.className = 'timeline-entry';

        let media = '';
        if (type === 'Bild') {
            media = `<img src="${src}" alt="Travnik Upload">`;
        } else if (type === 'Audio') {
            media = `<audio controls src="${src}"></audio>`;
        }

        entry.innerHTML = `
            <div class="timestamp">${timestamp}</div>
            ${media}
            <div class="comment">Kommentar: ${comment}</div>
            <div class="description">Beschreibung: ${description}</div>
        `;

        timeline.prepend(entry);
    }

    function autoTagging(description) {
        // Pseudo YOLO 2.0 für jetzt
        const words = description.split(' ');
        autoTags.innerHTML = '<ul>' + words.map(word => `<li>#${word.toLowerCase()}</li>`).join('') + '</ul>';
    }
});