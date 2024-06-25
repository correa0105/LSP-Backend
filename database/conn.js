import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import Lawyer from '../models/Lawyer';
import Client from '../models/Client';
import Process from '../models/Process';

export default class Connection {
  constructor() {
    this.sequelize = new Sequelize(databaseConfig);
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Conectado com sucesso!');
    } catch (err) {
      console.log('Não foi possivel conectarse ao banco de dados...', err);
    }
  }

  async syncModels() {
    try {
      Lawyer.init(this.sequelize);
      Client.init(this.sequelize);
      Process.init(this.sequelize);

      Lawyer.associate(this.sequelize.models);
      Client.associate(this.sequelize.models);
      Process.associate(this.sequelize.models);

      await this.sequelize.sync();
      console.log('Tabelas sincronizadas');
    } catch (err) {
      console.log('Não foi possivel sincronizar as tabelas...', err);
    }
  }
}
