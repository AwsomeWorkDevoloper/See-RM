const express = require('express');
const app = express();

const PluginController = require('./plugins/index');

const pluginController = new PluginController([
    require('./plugins/Router')
]);

require('dotenv').config();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(pluginController.handler);

app.get('/crm/', (req, res) => {
    res.render('crm', {pluginController: JSON.stringify(pluginController)});
})

const server = app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`));