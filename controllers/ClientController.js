import Client from '../models/Client';

import getToken from '../helpers/getToken';
import getLawyerByToken from '../helpers/getLawyerByToken';

const { Op } = require('sequelize');

class ClientController {
  async store(req, res) {
    const token = getToken(req);
    const lawyer = await getLawyerByToken(token);

    const clientBody = {
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      cpf: req.body.cpf,
      tel: req.body.tel,
      email: req.body.email,
      adress: req.body.adress,
      occupation: req.body.occupation,
      maritalStatus: req.body.maritalStatus,
      lawyer_id: lawyer.dataValues.id,
    };

    try {
      const client = await Client.create(clientBody);
      return res.json(client);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    const token = getToken(req);
    const lawyer = await getLawyerByToken(token);
    try {
      const { search = '', page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const where = {
        name: {
          [Op.like]: `%${search}%`,
        },
        lawyer_id: lawyer.dataValues.id,
      };

      const { count, rows } = await Client.findAndCountAll({
        where,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });

      return res.json({
        total: count,
        clients: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page, 10),
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const clients = await Client.findAll({
        where: {
          id,
        },
      });

      return res.json(clients);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const client = await Client.findByPk(req.params.id);

      if (!client) {
        return res.status(400).json({
          errors: ['Cliente não encontrado'],
        });
      }

      const token = getToken(req);
      const lawyer = await getLawyerByToken(token);

      if (client.lawyer_id.toString() !== lawyer.id.toString()) {
        return res
          .status(422)
          .json({ message: 'Você não pode editar o cliente de outro advogado' });
      }

      const attClient = await client.update(req.body);
      const { name, dateOfBirth, cpf, tel, email, adress, occupation, maritalStatus } =
        attClient;

      return res.json({
        name,
        dateOfBirth,
        cpf,
        tel,
        email,
        adress,
        occupation,
        maritalStatus,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const client = await Client.findByPk(req.params.id);

      if (!client) {
        return res.status(400).json({
          errors: ['Cliente não encontrado'],
        });
      }

      await client.destroy();

      return res.json({
        msg: 'Cliente removido com sucesso!',
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ClientController();
