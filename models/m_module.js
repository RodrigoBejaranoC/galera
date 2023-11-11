/*** Import module */
const { DataTypes } = require('sequelize')

/** Modele formation */

module.exports = (sequelize) => {
    const Module = sequelize.define('Module', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        id_formation: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        id_formateur: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        nom: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
    })
    return Module
}