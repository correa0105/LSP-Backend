import Sequelize, { Model } from 'sequelize';

export default class Process extends Model {
  static init(sequelize) {
    super.init(
      {
        number: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O tipo da conta é obrigatório',
            },
          },
        },
        parts: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'As partes do processo são obrigatórias',
            },
          },
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O tipo de processo é obrigatório',
            },
          },
        },
        subject: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O assunto é obrigatório',
            },
          },
        },
        matter: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'A matéria do processo é obrigatória',
            },
          },
        },
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'client_id' });
  }
}
