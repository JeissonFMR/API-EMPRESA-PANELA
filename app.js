const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnect } = require('./models/workerProfile')

//importo las rutas
const { WorkersAPI } = require('./routers/router.workers')

const app = express()
app.use(cors())
app.use(express.static('./storageFiles'))
app.use(express.json())


/**
 * UTILIZO LAS RUTAS
 */
WorkersAPI(app)


const port = process.env.PORT
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
})


dbConnect()