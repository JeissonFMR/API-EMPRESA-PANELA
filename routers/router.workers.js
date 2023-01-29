const express = require('express')
const { WorkerController } = require('../controllers/workers.controller')
const validatorCreateWorker = require('../validatorDB/validator.create')

// TODO: multer
const uploadMiddleware = require('../middleware/multer')

const router = express.Router()

module.exports.WorkersAPI = (app) => {
    router
        .get('/', WorkerController.getAllWorkers)
        .get('/:id', WorkerController.getOneWorker)
        .post('/', uploadMiddleware.single('image'), validatorCreateWorker, WorkerController.createWorker)
        .put('/:id', WorkerController.updateWorker)
        .delete('/:id', WorkerController.deleteWorker)
    app.use('/api/v1/workers/', router)
}



