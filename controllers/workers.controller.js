const { Worker } = require('../models/workerProfile')

const path = require('path')
const fs = require('fs');

require('dotenv').config()
const MEDIA_PATH = path.join(__dirname, '../storageFiles')
const port = process.env.PORT
module.exports.WorkerController = {
    /**
     * CREAR UNUEVO TRABAJADOR
     * @param {*} req 
     * @param {*} res 
     */
    createWorker: async (req, res) => {
        try {
            const { file } = req // aqui viene la foto, para que aparezca debo colocar el middleware de multer


            const { name, last_name, age, work, description } = req.body
            //console.log(body);
            // console.log(body.photo, '-------photo');
            // console.log(file.path, 'path 😀😀😀');
            const newData = {
                name,
                last_name,
                age,
                work,
                description,
                photo: file.filename
            }

            const data = await Worker.create(newData)
            console.log(data);
            res.status(201).send({ data, url: `http://localhost:${port}/${file.filename}` })
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
            console.log(req.body);
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
            const { photo } = data
            console.log(photo + '😀😀😀');
            const filepath = `${MEDIA_PATH}/${photo}` //TODO:RUTA ABSOLUTA
            fs.unlinkSync(filepath) //eliminar del servidor

            //eliminar registro de la db
            await Worker.destroy({ where: { id } })
            res.status(200).send({ data })
        } catch (error) {
            console.log(error);
            res.status(403).send('ERROR_DELETE_WORKER')
        }
    }

}