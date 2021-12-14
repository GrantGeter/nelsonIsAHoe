const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 3030

app.use(cors());
app.options('*', cors());
app.use(express.static(__dirname + "/public"))
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));

app.listen(port, () => {
    console.log('Up and running on port: ' + port)
})
