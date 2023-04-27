const Tutor = require('./models/tutores');
 
function findAll(limit) {
    return Tutor.findAll({ limit });
}
 
module.exports = { findAll }