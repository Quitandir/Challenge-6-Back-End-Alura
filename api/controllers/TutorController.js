const { where } = require('sequelize');
const database = require('../models');

class TutorController {
    static async pegaTodosTutores (req, res) {
        try {
            const todosTutores = await database.Tutores.findAll()
            return res.status(200).json(todosTutores)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmTutor (req, res) {
        const {id} = req.params
            
        try {                                                    
            const umTutor = await database.Tutores.findOne( {where: { id: Number(id)}})
            return res.status(200).json(umTutor)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaTutor (req, res) {
        const novoTutor = req.body
        try {
            const novoTutorCriado = await database.Tutores.create(novoTutor)
            return res.status(200).json(novoTutorCriado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaTutor (req, res) {
        const {id} = req.params
        const novasInfos = req.body

        try {
            await database.Tutores.update(novasInfos, {where: { id: Number(id)}} )
            
            const tutorAtualizado = await database.Tutores.findOne( {where: { id: Number(id)}})
            return res.status(200).json(tutorAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaTutor (req, res) {
        const {id} = req.params
            
        try {                                                    
            await database.Tutores.destroy( {where: { id: Number(id)}})
            return res.status(200).json({mensagem: `id ${id} deletado.`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TutorController;