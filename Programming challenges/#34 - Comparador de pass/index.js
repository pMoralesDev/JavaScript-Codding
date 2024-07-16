async function comparePasswords() {
    const plainPassword = 'qBtRcLkU';
    const hashedPassword = '$2a$10$lvrWVr/W0Qvtv7pKJtFstu0baVSxySPnzhHYKdM4sGeMjgkgnXFmu';

    const bcrypt = dcodeIO.bcrypt;

    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        document.getElementById('result').innerText = isMatch ? 'Passwords match!' : 'Passwords do not match!';
    } catch (error) {
        console.error('Error comparing passwords:', error);
        document.getElementById('result').innerText = 'Error comparing passwords';
    }
}