document.getElementById('downloadBtn').addEventListener('click', fetchAndDownloadUsers);

/**
 * @function generateRandomPassword
 * @param {number} length  numero de caracteres que quieres tenga la password
 * @returns 
 */
function generateRandomPassword(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

async function fetchAndDownloadUsers() {
    try {
    const response = await fetch('https://randomuser.me/api/?results=100&inc=name,email,dob,phone&noinfo&nat=es');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Filtrar nombres que no sean en árabe
    const filteredResults = data.results.filter(user => user.name.first.charCodeAt(0) < 1000);

    // Limitar la cantidad de administradores
    const usersWithRole = filteredResults.map((user, index) => {
    // Generar aleatoriamente el rol
    const role = index < 5 ? 'admin' : 'paciente'; // Establecer 5 como límite de administradores
    return {
        role: role,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        password: generateRandomPassword(8),
        age: user.dob.age,
        phone: user.phone,
    };
    });

    // Convertir los datos a JSON
    const jsonData = JSON.stringify(usersWithRole, null, 2);

    // Crear un blob con los datos JSON
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Crear un enlace para descargar el archivo JSON
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    } catch (error) {
    console.error('Error:', error.message);
    }
}