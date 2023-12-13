const mongoose = require('mongoose');

const URI = 'mongodb+srv://albertmota28:5Y6Nhirv9eeQ7jlZ@clusteradso2557466.htke3tm.mongodb.net/pruebaadsotarde'

mongoose.connect(URI);

module.exports = mongoose;