const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//users
const ContenidoSchema = new Schema({
  userid: {
    type: String,    
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  contenido: {
    type: String,
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  imgUrl: {
    type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRhv2_AJmH-7OPFYhiqCxprncJZbGF5uzAR_PRGbfFAKpB4SKgsw"
  }
});

module.exports = Item = mongoose.model('contenido', ContenidoSchema);
