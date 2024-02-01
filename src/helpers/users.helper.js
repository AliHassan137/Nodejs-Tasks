const bcrypt = require("bcryptjs");

module.exports.getHashValue = async (value) => {
    const salt = await bcrypt.genSalt(10);
    const hashValue = await bcrypt.hash(value, salt);
    return hashValue;
};
module.exports.comparePassword = async (password, userPassword) => {
    const isMatch = await bcrypt.compare(password, userPassword);
    return isMatch;
};