const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return { hashedPassword, salt };
}

module.exports = { encryptPassword };