const { Sequelize, DataTypes, Model } = require('sequelize')

const database = process.env.DATABASE
const usernamedb = process.env.USERNAMEDB
const passworddb = process.env.PASSWORDDB
const portdb = process.env.PORTDB


const sequelize = new Sequelize(database, usernamedb, passworddb, {
    host: 'localhost',
    dialect: 'postgres', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    port: portdb
});


class Worker extends Model { }

Worker.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false //TODO: este campo nunca puede ser vacio
    },
    last_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    age: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultvalue: 18
    },
    photo: {
        type: DataTypes.TEXT,
    },
    work: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Worker'
});

const dbConnect = async () => {
    try {
        await sequelize.sync({ force: true })
        await sequelize.authenticate();
        console.log('**** CONEXIÓN EXITOSA ****');
    } catch (error) {
        console.error('**** FALLÓ AL HACER LA CONEXIÓN ****', error);
    }
}




module.exports = {
    dbConnect,
    Worker
}


