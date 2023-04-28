const { where } = require('sequelize');
const database = require('../models');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const jwtSecret = 'fe3ffc04daeebfa13e18eb430c5cedba00935edd9d1edd342aeffdefeddd24caaf7ca8';

class AbrigoController {
    static async pegaTodosAbrigos (req, res) {
        try {
            const todosAbrigos = await database.Abrigos.findAll()
            if(todosAbrigos.lenght === 0) return res.status(200).json({msg: 'Nenhum abrigo encontrado.'})
            return res.status(200).json(todosAbrigos)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmAbrigo (req, res) {
        const {id} = req.params
            
        try {                                                    
            const umAbrigo = await database.Abrigos.findOne( {where: { id: Number(id)}})
            if(umAbrigo === null) return res.status(200).json({msg: 'Nenhum abrigo encontrado.'})
            return res.status(200).json(umAbrigo)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaAbrigo (req, res) {

      const {imagem, email, senha, nome, telefone, cidade, sobre} = req.body

      const abrigoJaExiste = await database.Abrigos.findOne( {where: { email: email}})
      
      if(!imagem == "") {
        const ehImagem = await fetch(imagem, { method: 'HEAD' }).then(ehImagem => {
          if (!ehImagem.headers.get('Content-Type').startsWith('image')) {
            return res.status(400).json({ message: "URL não é uma imagem válida." });
        }})
      }    
      
      if (senha.length < 8) {
          return res.status(400).json({ message: "Senha deve ter 8 ou mais caractéres." })
      }

      if (abrigoJaExiste) {
          return res.status(400).json({ message: "Email já cadastrado no sistema." })
      }
       

        bcrypt.hash(senha, 10).then(async (hash) => {
            await database.Abrigos.create({
              imagem,  
              email,
              senha: hash,
              nome,
              telefone,
              cidade,
              sobre
            })
              .then((abrigo) => {

                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                  { id: abrigo.id, 
                    imagem: abrigo.imagem, 
                    email: abrigo.email, 
                    nome: abrigo.nome, 
                    telefone: abrigo.telefone, 
                    cidade: abrigo.cidade, 
                    sobre: abrigo.sobre },
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
                  message: "Abrigo cadastrado com sucesso.",
                  abrigo,
                });
              })
              .catch((error) =>
              res.status(400).json({
                message: "Erro ao cadastrar novo abrigo.",
                error: error.message,
              })
            );
        });
    }
  
    static async logaAbrigo (req, res) {
        const { email, senha } = req.body

        if (!email || !senha) {
            return res.status(400).json({
              message: "Os campos email e senha não podem estar em branco.",
            })
          }
          try {
            const abrigo = await database.Abrigos.findOne({ where: {email: email}})
            if (!abrigo) {
              res.status(400).json({
                message: "Não foi possível fazer login.",
                error: "Email não encontrado.",
              })
            } else {
              // Comparação da senha cadastrada e da senha hashed.
              bcrypt.compare(senha, abrigo.senha).then(function (result) {
                if (result) {
                  const maxAge = 3 * 60 * 60;
                  const token = jwt.sign({   
                        id: abrigo.id, 
                        imagem: abrigo.imagem, 
                        email: abrigo.email, 
                        nome: abrigo.nome, 
                        telefone: abrigo.telefone, 
                        cidade: abrigo.cidade, 
                        sobre: abrigo.sobre },
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
                abrigo,
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

    static async atualizaAbrigo (req, res) {
        const {id} = req.params
        const novasInfos = req.body

        try {
            await database.Abrigos.update(novasInfos, {where: { id: Number(id)}} )
            
            const abrigoAtualizado = await database.Abrigos.findOne( {where: { id: Number(id)}})
            return res.status(200).json(abrigoAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaAbrigo (req, res) {
        const {id} = req.params
            
        try {                                                    
            await database.Abrigos.destroy( {where: { id: Number(id)}})
            return res.status(200).json({mensagem: `id ${id} deletado.`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    

     
}

module.exports = AbrigoController;