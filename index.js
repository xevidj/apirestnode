
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;

const app = express();

app.set('view engine', 'ejs');
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(allowCrossDomain);
/* 
* Connect to MongoDB
*/
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected SUCCESS'))
  .catch(err => console.log(err));

/*
* Definition of MongoDB models
*/
const Contenido = require('./models/Contenido');
const Comentario = require('./models/Comentario');
const User = require('./models/User');

/*
*Rutas
*/ 
app.get("/login", (req, res) => {
  res.render("login")
});

app.get("/principal_user", (req, res) => {
  res.render("principal_user")
});
app.get("/principal_admin", (req, res) => {
  res.render("principal_admin")
});
app.get("/post_info_user/:idpost", (req, res) => {
  res.render("post_info_user", {idpost: req.params.idpost})
});
app.get("/post_info_admin/:idpost", (req, res) => {
  console.log(req.params.idpost)
  res.render("post_info_admin",{idpost: req.params.idpost})
});
/*
* Start Api rest Services
*/
//dummy rest
app.get('/hello', (req, res) => res.send('Hello World with Express'));










/*
* User Services
*/
//obtener todos los usuarios
app.get('/user/getAll', (req, res) => {

  User.find({}).then(function (users) {
    res.send(users);
  });

});
//crear un usuario
app.post('/user/create', (req, res) => {
  // Enable cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  console.log("Body request:");
  console.log(req.body);
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    tipo: req.body.tipo,
    email: req.body.email

  });
  console.log("Saving user");
  console.log(newUser);
  //save user in database
  newUser.save()
    .then(item => res.status(200).json({ msg: 'success' }))
    .catch(err => res.status(404).json({ msg: err }));;
});
//login
app.post('/user/login', (req, res) => {
  // Enable cors
  // Enable cors
  try {
    console.log("Body request:");
    console.log(req.body);
    User.findOne({ username: req.body.username }, function (err, user) {

      if (err) {
        return res.status(404).json({ msg: err });
      }
      if (user) {
        console.log(user);

        if (user.password == req.body.password) {
          return res.status(200).json({ msg: 'success' , username: user.username, tipo: user.tipo});

        }
        else {
          return res.status(404).json({ msg: 'Incorrect password' });

        }

      }
      else{
        return res.status(404).json({ msg: 'user not found' });
      }
    });

    console.log("end login");
  }
  catch (err) {
    return res.status(404).json({ msg: 'error' });
  }


});



/*
* Contenido Services
*/
//obtener todos los post 
app.get('/posts/getAll', (req, res) => {
  // Enable cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  Contenido.find({}).then(function (posts) {
    res.send(posts);
  });

});
//obtener por id
app.get('/posts/getById/:id', (req, res) => {
  // Enable cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // res.send('cors problem fixed:)');
  Contenido.find({ _id: req.params.id }).then(function (posts) {
    res.send(posts);

  }).catch(err => res.status(404).json({ code: 404, msg: "error" }));

});
//crear un post 
app.post('/posts/create', (req, res) => {
  // Enable cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  console.log("Body request:");
  console.log(req.body);
  const newObject = new Contenido({
    userid: req.body.userid,
    titulo: req.body.titulo,
    contenido: req.body.contenido,
    imgUrl: req.body.imgUrl

  });
  console.log("Saving post");
  console.log(newObject);
  //save user in database
  newObject.save()
    .then(item => res.status(200).json({ code: 200, msg: "success" }))
    .catch(err => res.status(404).json({ code: 404, msg: err }));
});
//delete post
app.delete('/posts/:id', (req, res) => {
  // Enable cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  console.log("Body request:");
  console.log(req.params);
  Contenido.remove({ _id: req.params.id }, function (err) {
    if (!err) {
      return res.status(200).json({ code: 200, msg: "success" })
    }
    else {
      return res.status(404).json({ code: 404, msg: err });
    }
  });
});

/*
* Comentario Services
*/

//list comentarios 
app.get('/comentario/getAll', (req, res) => {
  // Enable cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  Comentario.find({}).then(function (posts) {
    res.send(posts);
  });

});
app.get('/comentario/getById/:id', (req, res) => {
  // Enable cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  Comentario.find({ _id: req.params.id }).then(function (posts) {
    res.send(posts);
  }).catch(err => res.status(404).json({ code: 404, msg: e }));

});
app.get('/comentario/getByPost/:contenidoid', (req, res) => {
  // Enable cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  Comentario.find({ contenidoid: req.params.contenidoid }).then(function (posts) {
    res.send(posts);
  }).catch(err => res.status(404).json({ code: 404, msg: e }));

});
//crear un comentario
app.post('/comentario/create', (req, res) => {
  // Enable cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  console.log("Body request:");
  console.log(req.body);
  const newObject = new Comentario({
    userid: req.body.userid,
    contenidoid: req.body.contenidoid,
    comentario: req.body.comentario
  });
  console.log("Saving post");
  console.log(newObject);
  //save user in database
  newObject.save()
    .then(item => res.status(200).json({ code: 200, msg: "success" }))
    .catch(err => res.status(404).json({ code: 404, msg: e }));
});

//delete un  comentario 
app.delete('/comentario/:id', (req, res) => {
  // Enable cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  console.log("Body request:");
  console.log(req.params);
  Comentario.remove({ _id: req.params.id }, function (err) {
    if (!err) {
      return res.status(200).json({ code: 200, msg: "success" })
    }
    else {
      return res.status(404).json({ code: 404, msg: err });
    }
  });
});




// Port
const port = 3000;

//app.listen(port, () => console.log('Server running...'));

app.listen(port, function () {
  console.log("Running RestHub on port " + port);
});