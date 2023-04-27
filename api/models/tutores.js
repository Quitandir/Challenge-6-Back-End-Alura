'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tutores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tutores.hasMany(models.Adocoes, {
        foreignKey: 'tutor_id'
      })
    }
  } 
  Tutores.init({
    nome: {
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
    }
  }, {
    sequelize,
    modelName: 'Tutores',
    defaultScope: { // impedes password from being shown
      attributes: {
        exclude: ["password"]
      }
    },
    scopes: {
      withPassword: { // allows password to be shown
        attributes: {
          include: ["password"]
        }
      }
    }
  });
  return Tutores;
};