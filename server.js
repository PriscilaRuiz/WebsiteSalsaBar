const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/salsabar', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Conexión exitosa a la base de datos MongoDB');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Definición del modelo de Producto
const productoSchema = new mongoose.Schema({
  nombre: String,
  categoria: String,
  precio: String,
  imagen:String
});
const Producto = mongoose.model('Producto', productoSchema);

// Definición del modelo de Orden
const ordenSchema = new mongoose.Schema({
  persona: String,
  ip: String,
  celular:String,
  fecha: String,
  estado:Boolean,
  direccion:String,
  total:Number,
  pedido:[]

});

ordenSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Orden = mongoose.model('Orden', ordenSchema);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Rutas de la API
const productoRouter = express.Router();
const ordenRouter = express.Router();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Obtener todas los productos
productoRouter.route('/productos').get((req, res) => {
  Producto.find({})
  .then(productos => {
    res.json(productos);
  })
  .catch(err => {
    console.log(err);
  });
});
// filtro
productoRouter.route('/productos/filtro').get((req, res) => {
  const palabra = req.query;
  const regex = new RegExp(`^${palabra}`, 'i');
  console.log(palabra);
  Producto.find({nombre: { $regex: regex }})
  .then(productos => {
    res.json(productos);
    console.log(productos);
  })
  .catch(err => {
    console.log(err);
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Obtener todas los productos
ordenRouter.route('/ordenes').get((req, res) => {
  Orden.find({estado: false})
  .then(ordenes => {
    res.json(ordenes);
  })
  .catch(err => {
    console.log(err);
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Obtener orden false
ordenRouter.route('/ordenes/ordenFalsa').get((req, res) => {
  Orden.find({estado: false})
  .then(ordenes => {
    res.json(ordenes);
  })
  .catch(err => {
    console.log(err);
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Obtener todas los productos(alitas saladas)
productoRouter.route('/productos/alitas_saladas').get((req, res) => {
  Producto.find({categoria: 'Salsa Salada'})
  .then(productos => {
    res.json(productos);
  })
  .catch(err => {
    console.log(err);
  });
});

// Obtener todas los productos(alitas dulces)
productoRouter.route('/productos/alitas_dulces').get((req, res) => {
  Producto.find({categoria: 'Salsa Dulce'})
  .then(productos => {
    res.json(productos);
  })
  .catch(err => {
    console.log(err);
  });
});

// Obtener todas los productos(alitas picantes)
productoRouter.route('/productos/alitas_picantes').get((req, res) => {
  Producto.find({categoria: 'Salsa Picante'})
  .then(productos => {
    res.json(productos);
  })
  .catch(err => {
    console.log(err);
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Obtener todas los productos(salchis)
productoRouter.route('/productos/salchis').get((req, res) => {
  Producto.find({categoria: 'Salchis'})
  .then(productos => {
    res.json(productos);
  })
  .catch(err => {
    console.log(err);
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Obtener todas los productos(bebidas)
productoRouter.route('/productos/bebidas').get((req, res) => {
  Producto.find({categoria: 'Bebidas'})
  .then(productos => {
    res.json(productos);
  })
  .catch(err => {
    console.log(err);
  });
});

// Obtener todas los productos(cerveza)
productoRouter.route('/productos/cerveza').get((req, res) => {
  Producto.find({categoria: 'Cerveza'})
  .then(productos => {
    res.json(productos);
  })
  .catch(err => {
    console.log(err);
  });
});

// Obtener todas los productos(refrescos)
productoRouter.route('/productos/refrescos').get((req, res) => {
  Producto.find({categoria: 'Refrescos'})
  .then(productos => {
    res.json(productos);
  })
  .catch(err => {
    console.log(err);
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//otener por posicion
productoRouter.route('/productos/:id').get((req, res) => {
  const productoId = parseInt(req.params.id);

  Producto.find({}).sort({ _id: 1 }).skip(productoId-1).limit(1)
    .then(producto => {
      res.json(producto);
      console.log(producto)
    })
    .catch(err => {
      console.log(err);
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//eliminar por posicion
productoRouter.route('/productos/delete/:id').get((req, res) => {
  const productoId = parseInt(req.params.id);

  Producto.find({})
    .sort({ _id: 1 })
    .skip(productoId - 1)
    .limit(1)
    .then(documentos => {
      if (documentos.length === 0) {
        throw new Error('No se encontró el documento');
      }

      const lugar = documentos[0];

      return Producto.findByIdAndDelete(lugar._id);
    })
    .then(deletedProducto => {
      res.json(deletedProducto);
      console.log(deletedProducto);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Ocurrió un error al eliminar el producto.' });
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Añadir una nuevo producto
productoRouter.route('/productos/add').post((req, res) => {
  const producto = new Producto(req.body);
  producto.save()
    .then(producto => {
      res.status(200).json({ 'producto': 'Producto añadido exitosamente' });
    })
    .catch(err => {
      res.status(400).send('No se pudo guardar el Producto');
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Añadir una nueva orden
ordenRouter.route('/ordenes/add').post((req, res) => {
  const orden = new Orden(req.body);
  orden.save()
    .then(orden => {
      res.status(200).json({ 'producto': 'Producto añadido exitosamente' });
    })
    .catch(err => {
      res.status(400).send('No se pudo guardar el Producto');
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ordenRouter.route('/ordenes/:id/edit').put((req, res) => {
  const orderId = req.params.id;
  const nuevoDato = req.body.nuevo;
  const antiguoDato = req.body.existente;

  antiguoDato.push(nuevoDato);
  const ingreso = {
    pedido: antiguoDato
  }
  console.log(req.params.id);
  console.log('');
  console.log(req.body);
  console.log('');
  console.log(req.body.nuevo);
  console.log('');
  console.log(req.body.existente);
  console.log('');
  console.log(ingreso);


  Orden.updateOne({_id:orderId},ingreso)
    .then(() => {
      res.status(200).json({ 'orden': 'Orden actualizada exitosamente' });
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('No se pudo actualizar la orden');
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

ordenRouter.route('/ordenes/:id/finalizar').put((req, res) => {
  const orderId = req.params.id;
  const nuevoPedido = req.body.nuevo;

  const ingreso = {
    pedido: nuevoPedido
  };


  Orden.updateOne({ _id: orderId }, ingreso)
    .then(() => {
      res.status(200).json({ 'orden': 'Orden actualizada exitosamente' });
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('No se pudo actualizar la orden');
    });
});
//////////////////////////////////////////////////////////////////////////////////////
ordenRouter.route('/ordenes/:id/subido').put((req, res) => {
  const orderId = req.params.id;
  const nuevoEstado = req.body.estado;

  ingreso = {
    estado: nuevoEstado
  };
  

  Orden.updateOne({ _id: orderId }, ingreso)
    .then(() => {
      res.status(200).json({ 'orden': 'Orden subida exitosamente' });
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('No se pudo actualizar la orden');
    });
});
////////////////////////////////////////////////////////////////////////////////////////////

// Obtener todas los productos(personal)
productoRouter.route('/productos/personales').get((req, res) => {
  Producto.find({categoria: 'Personal'})
  .then(persons => {
    res.json(persons);
  })
  .catch(err => {
    console.log(err);
  });
});
// Obtener todas los productos(personal)
productoRouter.route('/productos/combos').get((req, res) => {
  Producto.find({categoria: 'Combos'})
  .then(persons => {
    res.json(persons);
  })
  .catch(err => {
    console.log(err);
  });
});


app.use('/api', productoRouter);
app.use('/api', ordenRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log('Servidor backend en ejecución en el puerto: ' + port);
});
