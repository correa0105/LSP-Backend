import Sequelize, { Model } from 'sequelize';

export default class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O nome é obrigatório',
            },
          },
        },
        dateOfBirth: {
          type: Sequelize.DATE,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'A data de nascimento é obrigatória',
            },
            isDate: {
              msg: 'A data fornecida não é uma data válida',
            },
          },
        },
        cpf: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            msg: 'CPF já cadastrado.',
          },
          validate: {
            notNull: {
              msg: 'O CPF é obrigatório.',
            },
            is: {
              args: /^\d{11}$/, // Expressão regular para validar o formato do CPF (11 dígitos numéricos)
              msg: 'CPF inválido. Deve conter 11 dígitos numéricos.',
            },
          },
        },
        tel: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O numero de celular é obrigatório',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            msg: 'Email já cadastrado.',
          },
          validate: {
            notNull: {
              msg: 'o email é obrigatório',
            },
            isEmail: {
              msg: 'Email inválido.',
            },
          },
        },
        adress: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O endereço é obrigatório',
            },
          },
        },
        occupation: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'A profissão é obrigatória',
            },
          },
        },
        maritalStatus: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'Estado civil é obrigatório',
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
    this.belongsTo(models.Lawyer, { foreignKey: 'lawyer_id' });
    this.hasMany(models.Process, { foreignKey: 'client_id' });
  }
}
