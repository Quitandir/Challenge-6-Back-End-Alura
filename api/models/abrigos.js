'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Abrigos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Abrigos.hasMany(models.Adocoes, {
        foreignKey: 'abrigo_id'
      }),
      Abrigos.hasMany(models.Pets, {
        foreignKey: 'abrigo_id'
      });
    }
  }
  Abrigos.init({
    imagem: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isUrl: {
          args: true,
          msg: "Imagem tem que ser uma url."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Esse email já está em uso.'
      },
      validate: {
        isEmail: {
          args: true,
          msg : "Formato de e-mail inválido."
        }
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        customValidator(value) {
          if (value === "") {
            throw new Error("Campo não pode estar vazio.");
          }
        }
      }
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nome não pode estar vazio."
        }
      }
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Insira apenas números para cadastrar seu telefone.'
        }
      }
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'O campo não pode estar vazio.'
        }
      }
    },
    sobre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'O campo não pode estar vazio.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Abrigos',
  });
  return Abrigos;
};