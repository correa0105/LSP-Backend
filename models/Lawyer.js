import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class Lawyer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O nome é obrigatório.',
            },
            len: {
              args: [3, 255],
              msg: 'O nome deve conter entre 3 e 255 caracteres.',
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
        oab: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            msg: 'OAB já cadastrada.',
          },
          validate: {
            notNull: {
              msg: 'O numero da OAB é obrigatório.',
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.VIRTUAL,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'A senha é obrigatória',
            },
            len: {
              args: [8, 36],
              msg: 'A senha deve conter entre 8 e 36 caracteres.',
            },
          },
        },
      },
      {
        sequelize,
      },
    );

    this.addHook('beforeSave', async (lawyer) => {
      if (lawyer.password) {
        const updatedLawyer = { ...lawyer };
        updatedLawyer.password_hash = await bcryptjs.hash(lawyer.password, 8);
        Object.assign(lawyer, updatedLawyer);
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Client, { foreignKey: 'lawyer_id' });
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
