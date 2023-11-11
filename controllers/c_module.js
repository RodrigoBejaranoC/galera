/*************************/
/*** Import used modules */
const { format } = require('mysql2');
const DB = require('../db.config');
const Module = DB.Module;
/*****************************************/
/*** Unit route for Module resource */

exports.getAllModules = (req, res) => {
    module.findAll()
        .then(modules => res.json({ message: "All Modules" }))
        .catch(e => res.status(500).json({ message: 'Database Error', error: e }))
}

exports.getModule = async (req, res) => {
    let moduleId = parseInt(req.params.id);
    // Vérification si le champ id es présent et cohérent
    if (!moduleId) {
        return res.json(400).json({ message: 'Missing Parameter' });
    }
    try {
        //Récuperation
        let module = await Module.findOne({ where: { id: moduleId } })
        // si la Module n'existe pas
        if (module === null) {
            return res.json(400).json({ message: 'This Module does not exist' });
        }

        // envoi des données
        return res.json({ data: module });
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err });
    }

}

exports.addModule = async (req, res) => {
    const { nom, debut, fin } = req.body; // de structurer le BODY pour avoir une shortcut à ses parts
    //validation des données reçues
    if (!nom) {
        return res.status(400).json({ message: 'Missing Data' });
    }
    try {
        //Vérification si la Module existe
        let module = await Module.findOne({ where: { nom: nom }, raw: true }); // mejor trabajar con el ID
        if (module !== null) {
            return res.status(409).json({ message: `The Module ${nom} already exists!` })
        }
        //Création
        module = await Module.create(req.body);
        return res.json({ message: 'Module Created', data: module });
    } catch (err) {
        return res.status(500).json({ message: 'Database error', error: err });
    }
}

/*
exports.updateModule = async (req, res) => {
    let pid = parseInt(req.params.id)

    return res.json({ message: `Module id:${pid} Updated`})
}

exports.deleteModule =  (req, res) => {
    let pid = parseInt(req.params.id)

    return res.status(204).json({})
}
*/