const ctrl = {};

const { Image } = require('../models');

ctrl.index = async (req, res) => {
    try {
        const images = await Image.find({}).lean().sort({ timestamp: -1 });
        res.render('index', { images });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = ctrl;
