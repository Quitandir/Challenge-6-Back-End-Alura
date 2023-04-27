'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imagem: {
        type: Sequelize.STRING
      },
      nome: {
        type: Sequelize.STRING
      },
      idade: {
        type: Sequelize.STRING
      },
      porte: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      adotado: {
        type: Sequelize.BOOLEAN
      },
      abrigo_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Abrigos', key: 'id'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pets');
  }
};