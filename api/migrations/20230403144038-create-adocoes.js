'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Adocoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.DATEONLY
      },
      tutor_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Tutores', key: 'id'}
      },
      abrigo_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Abrigos', key: 'id'}
      },
      pet_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Pets', key: 'id'}
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
    await queryInterface.dropTable('Adocoes');
  }
};