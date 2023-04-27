const { where } = require('sequelize');
const database = require('../models');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const jwtSecret = 'fe3ffc04daeebfa13e18eb430c5cedba00935edd9d1edd342aeffdefeddd24caaf7ca8';

class TutorController {
    static async pegaTodosTutores (req, res) {
        try {
            const todosTutores = await database.Tutores.findAll()
            if(todosTutores.lenght === 0) return res.status(200).json({msg: 'Nenhum tutor encontrado.'})
            return res.status(200).json(todosTutores)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmTutor (req, res) {
        const {id} = req.params
            
        try {                                                    
            const umTutor = await database.Tutores.findOne( {where: { id: Number(id)}})
            if(umTutor === null) return res.status(200).json({msg: 'Nenhum tutor encontrado.'})
            return res.status(200).json(umTutor)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }    

    // Autenticações para tutores

    static async criaTutor (req, res) {        
    
        const { nome, email, senha } = req.body
        const tutorJaExiste = await database.Tutores.findOne( {where: { email: email}})

        if (senha.length < 8) {
        return res.status(400).json({ message: "Senha deve ter 8 ou mais caractéres." })
        }

        if (tutorJaExiste) {
            return res.status(400).json({ message: "Email já cadastrado no sistema." })
        }

        bcrypt.hash(senha, 10).then(async (hash) => {
            await database.Tutores.create({
              nome,
              email,
              senha: hash,
            })
              .then((tutor) => {

                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                  { id: tutor.id, nome: tutor.nome, email: tutor.email },
                  jwtSecret,
                  {
                    expiresIn: maxAge, // 3hrs in sec
                  }
                );
                res.cookie("jwt", token, {
                  httpOnly: true,
                  maxAge: maxAge * 1000, // 3hrs in ms
                });
                
                res.status(200).json({
                  message: "Tutor cadastrado com sucesso.",
                  tutor,
                });
              })
              .catch((error) =>
                res.status(400).json({
                  message: "Erro ao cadastrar novo tutor.",
                  error: error.message,
                })
              );
          });

    }

    static async logaTutor (req, res) {
        const { email, senha } = req.body

        if (!email || !senha) {
            return res.status(400).json({
              message: "Os campos email e senha não podem estar em branco.",
            })
        }
        try {
          const tutor = await database.Tutores.findOne({ where: {email: email}})
            if (!tutor) {
            res.status(400).json({
              message: "Não foi possível fazer login.",
              error: "Email não encontrado.",
              });
            } else {
              // Comparação da senha cadastrada e da senha hashed.
              bcrypt.compare(senha, tutor.senha).then(function (result) {
                if (result) {
                  const maxAge = 3 * 60 * 60;
                  const token = jwt.sign(
                    { id: tutor.id, nome: tutor.nome, email: tutor.email },
                    jwtSecret,
                    {
                      expiresIn: maxAge, // 3hrs in sec
                    }
                  );
                  res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000, // 3hrs in ms
                  });
              res.status(201).json({
                message: "Sucesso ao realizar jogin.",
                tutor,
              });
            } else {
              res.status(400).json({ message: "Erro ao realizar login." });
              }
              });
            } 
          } catch (error) {
            res.status(400).json({
              message: "Aconteceu um erro.",
              error: error.message,
          })
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