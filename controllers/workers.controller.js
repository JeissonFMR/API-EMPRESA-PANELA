const { Worker } = require('../models/workerProfile')

module.exports.WorkerController = {
    /**
     * CREAR UNUEVO TRABAJADOR
     * @param {*} req 
     * @param {*} res 
     */
    createWorker: async (req, res) => {
        try {
            const { body } = req
            console.log(body);
            const data = await Worker.create(body)
            res.status(201).send({ data })
        } catch (error) {
            res.status(403).send('ERROR_CREATE_WORKER')
            console.log(error);
        }
    },
    /**
     * OBTENER LISTA DE TODOS LOS TRABAJADORES
     * @param {*} req 
     * @param {*} res 
     */
    getAllWorkers: async (req, res) => {
        try {
            const data = await Worker.findAll()
            res.status(200).send({ data })
        } catch (error) {
            res.status(403).send('ERROR_GET_ALL_WORKER')
        }
    },
    /**
     * Obtener detalles del trabajador
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    getOneWorker: async (req, res) => {
        try {
            const { params: { id } } = req
            const data = await Worker.findOne({ where: { id } })
            if (!data) {
                return res.status(403).send('WORKER_NOT_EXISTS')
            }
            res.status(200).send({ data })
        } catch (error) {
            res.status(403).send('ERROR_DETAIL_WORKER')
        }
    },
    /**
     * ACTUALIZAR TRABAJADOR
     * @param {*} req 
     * @param {*} res 
     */
    updateWorker: async (req, res) => {
        try {
            const { params: { id } } = req
            const data = await Worker.findOne({ where: { id } })
            if (!data) {
                return res.status(403).send('WORKER_NOT_EXISTS')
            }
            Object.assign(data, req.body)
            await data.save()
            res.status(200).send({ data })
        } catch (error) {
            res.status(403).send('ERROR_UPDATE_WORKER')
        }
    },
    /**
     * ELIMINAR TRABAJADOR
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    deleteWorker: async (req, res) => {
        try {
            const { params: { id } } = req
            const data = await Worker.findOne({ where: { id } })
            if (!data) {
                return res.status(403).send('WORKER_NOT_EXISTS')
            }
            await Worker.destroy({ where: { id } })
            res.status(200).send({ data })
        } catch (error) {
            res.status(403).send('ERROR_DELETE_WORKER')
        }
    }

}