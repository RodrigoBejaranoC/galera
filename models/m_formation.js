/*** Import module */
const { DataTypes } = require('sequelize')

/** Modele formation */

module.exports = (sequelize) => {
    const Formation = sequelize.define('Formation', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        debut: {
            type: DataTypes.INTEGER(10),
            defaultValue: 0,
            allowNull: false
        },
        fin: {
            type: DataTypes.INTEGER(10),
            defaultValue: 0,
            allowNull: false
        },

    })
    return Formation
}