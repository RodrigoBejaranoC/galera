/*************************/
/*** Import used modules */
const { format } = require('mysql2');
const DB = require('../db.config');
const Formateur = DB.Formateur;

/*****************************************/
/*** Unit route for Formateur resource */

exports.getAllFormateurs = (req, res) => {
    Formateur.findAll()
        .then(formateurs => res.json({ message: "All Formateurs" }))
        .catch(e => res.status(500).json({ message: 'Database Error', error: e }))
}

exports.getFormateur = async (req, res) => {
    let formateurId = parseInt(req.params.id);
    // Vérification si le champ id es présent et cohérent
    if (!formateurId) {
        return res.json(400).json({ message: 'Missing Parameter' });
    }
    try {
        //Récuperation
        let formateur = await Formateur.findOne({ where: { id: formateurId } })
        // si le formateur n'existe pas
        if (formateur === null) {
            return res.json(400).json({ message: 'This formateur does not exist' });
        }

        // envoi des données
        return res.json({ data: formateur });
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err });
    }

}

exports.addFormateur = async (req, res) => {
    const { firstname, lastname, email, password } = req.body; // de structurer le BODY pour avoir une shortcut à ses parts
    //validation des données reçues
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: 'Missing Data' });
    }
    try {
        //Vérification si le formateur existe
        let formateur = await Formateur.findOne({ where: { email: email }, raw: true }); // mejor trabajar con el ID
        if (formateur !== null) {
            return res.status(409).json({ message: `The formateur ${firstname} ${lastname}  already exists!` })
        }
        //Création
        formateur = await Formateur.create(req.body);
        return res.json({ message: 'Formateur Created', data: formateur });
    } catch (err) {
        return res.status(500).json({ message: 'Database error', error: err });
    }
}

exports.deleteFormateur = async (req, res) => {
    let formateurId = parseInt(req.params.id);
    // Vérification si le champ id es présent et cohérent
    if (!formateurId) {
        return res.json(400).json({ message: 'Missing Parameter' });
    }
    try {
        await Formateur.destroy({ where: { id: formateurId } });

        res.json({ message: 'Formateur and related Notes are deleted successfully.' });
    } catch (err) {
        return res.status(500).json({ message: 'Echec Delete ', error: err });
    }

}
/*

exports.updateFormateur = async (req, res) => {
    let pid = parseInt(req.params.id)

    return res.json({ message: `Formateur id:${pid} Updated` })
}

*/