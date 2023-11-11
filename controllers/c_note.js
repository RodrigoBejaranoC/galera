/*************************/
/*** Import used modules */
const { format } = require('mysql2');
const DB = require('../db.config');
const Note = DB.Note;

/*****************************************/
/*** Unit route for Note resource */

exports.getAllNotes = (req, res) => {
    Note.findAll()
        .then(notes => res.json({ message: "All Note" }))
        .catch(e => res.status(500).json({ message: 'Database Error', error: e }))
}

exports.getNote = async (req, res) => {
    const { id_formateur, id_eleve } = req.body;
    //let noteId = parseInt(req.params.id);
    // Vérification si le champ id es présent et cohérent
    if (!id_formateur || !id_eleve) {
        return res.json(400).json({ message: 'Missing Parameter' });
    }
    try {
        //Récuperation
        let note = await Note.findOne({ where: { id_formateur: id_formateur, id_eleve: id_eleve } })
        // si la Note n'existe pas
        if (note === null) {
            return res.json(400).json({ message: 'This Note does not exist' });
        }

        // envoi des données
        return res.json({ data: note });
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err });
    }

}

exports.addNote = async (req, res) => {
    const { id_formateur, id_eleve, module_id, value, comment } = req.body; // de structurer le BODY pour avoir une shortcut à ses parts
    //validation des données reçues
    if (!id_formateur || !id_eleve || !module_id || !value || !comment) {
        return res.status(400).json({ message: 'Missing Data' });
    }
    try {
        //Vérification si la Note existe
        let note = await note.findOne({ where: { id_formateur: id_formateur, id_eleve: id_eleve }, raw: true }); // mejor trabajar con el ID
        if (note !== null) {
            return res.status(409).json({ message: `The Note ${id_formateur} ${id_eleve} already exists!` })
        }
        //Création
        note = await Note.create(req.body);
        return res.json({ message: 'Note Created', data: note });
    } catch (err) {
        return res.status(500).json({ message: 'Database error', error: err });
    }
}

/*

exports.updateNote = async (req, res) => {
    let pid = parseInt(req.params.id)

    return res.json({ message: `Note id:${pid} Updated`})
}

exports.deleteNote =  (req, res) => {
    let pid = parseInt(req.params.id)

    return res.status(204).json({})
}
*/