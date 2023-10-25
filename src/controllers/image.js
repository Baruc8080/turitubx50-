const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');

const { Image } = require('../models');

const ctrl = {};

ctrl.index = (req, res) => {
  res.render('image')
};

ctrl.create = async (req, res) => {
  try {
    let imgUrl;
    let ext;

    do {
      imgUrl = randomNumber();
      ext = path.extname(req.file.originalname).toLowerCase();
    } while (await Image.exists({ filename: imgUrl + ext }));

    const imageTempPath = req.file.path;
    const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
      await fs.rename(imageTempPath, targetPath);
      const newImg = new Image({
        title: req.body.title,
        filename: imgUrl + ext,
        description: req.body.title, // Utilizas el título como descripción, ajusta según tus necesidades
      });
      await newImg.save();
      res.send('¡Imagen subida exitosamente!');
    } else {
      // Manejar tipo de archivo no admitido
      await fs.unlink(imageTempPath); // Elimina el archivo temporal
      res.status(400).send('Tipo de archivo no admitido');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

ctrl.like = (req, res) => {
  // Implementar lógica para dar "me gusta" a una imagen aquí
};

ctrl.comment = (req, res) => {
  // Implementar lógica para agregar comentarios a una imagen aquí
};

ctrl.remove = (req, res) => {
  // Implementar lógica para eliminar una imagen aquí
};

module.exports = ctrl;
