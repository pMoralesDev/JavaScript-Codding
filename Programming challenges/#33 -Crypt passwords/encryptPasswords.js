document.getElementById('encrypt-btn').addEventListener('click', async () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput.files.length === 0) {
        alert('Please select a file');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
        try {
            const users = JSON.parse(event.target.result);
            const bcrypt = dcodeIO.bcrypt;

            const encryptedUsers = await Promise.all(users.map(async (user) => {
                if (!user.password.startsWith('$2a$')) { // Verificar si la contraseña ya está encriptada
                    const hashedPassword = await bcrypt.hash(user.password, 10);
                    return { ...user, password: hashedPassword };
                }
                return user;
            }));

            downloadJSON(encryptedUsers, 'encryptedUsers.json');
        } catch (error) {
            console.error('Error processing file', error);
            alert('Error processing file');
        }
    };

    reader.readAsText(file);
});

// Función para descargar el JSON
function downloadJSON(json, filename) {
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
