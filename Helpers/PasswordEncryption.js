const bcrypt = require('bcrypt');

module.exports = {

    passwordHashing : function (password) {
        return bcrypt.hashSync(password, 10);
    },

    verifyPassword : function (password, hash) {
        if (bcrypt.compareSync(password, hash)) {
            return true;
        }
        return false;
    },

};