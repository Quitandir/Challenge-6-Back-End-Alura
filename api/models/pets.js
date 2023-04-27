'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pets.hasMany(models.Adocoes, {
        foreignKey: 'pet_id'
      }),
      Pets.belongsTo(models.Abrigos, {
        foreignKey: 'abrigo_id'
      });
    }
  }
  Pets.init({
    imagem: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isUrl: {
          args: true,
          msg: "imagem tem que ser uma url"
        }
      }
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg : "O nome não pode estar vazio."
        }
      }
    },
    idade: {
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
    porte: {
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
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg : "descrição não pode estar vazia"
        }
      }
    },
    adotado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Pets',
    defaultScope: {
      where: {
        adotado: false
      }
    },
    scopes: {
      todos: { where: {} }
    }
  });
  return Pets;
};