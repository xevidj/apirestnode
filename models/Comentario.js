const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Comentario 
const ComentarioSchema = new Schema({
  userid: {
    type: String,    
    required: true
  },
  contenidoid: {
    type: String,    
    required: true
  },
  comentario: {
    type: String,
    required: true
  },  
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('comentario', ComentarioSchema);
