import Process from '../models/Process';
import Client from '../models/Client';

class ProcessController {
  async store(req, res) {
    const { clientId } = req.body;

    try {
      const client = await Client.findByPk(clientId);

      if (!client) {
        return res.status(400).json({
          errors: ['Cliente não encontrado'],
        });
      }

      const processBody = {
        number: req.body.number,
        parts: req.body.parts,
        subject: req.body.subject,
        matter: req.body.matter,
        type: req.body.type,
        client_id: clientId,
      };

      const process = await Process.create(processBody);
      return res.json(process);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const { type = '', page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      let where = {};
      if (type) {
        where = {
          type,
        };
      }

      const { count, rows } = await Process.findAndCountAll({
        where,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });

      return res.json({
        total: count,
        processes: rows,
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
    const clientId = req.params.id;

    try {
      const client = await Client.findByPk(clientId);

      if (!client) {
        return res.status(400).json({
          errors: ['Cliente não encontrado'],
        });
      }

      const process = await Process.findAll({ where: { client_id: clientId } });

      return res.json(process);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const process = await Process.findByPk(req.params.id);

      if (!process) {
        return res.status(400).json({
          errors: ['Processo não encontrado'],
        });
      }

      const attProcess = await process.update(req.body);
      const { number, parts, subject, matter } = attProcess;

      return res.json({ number, parts, subject, matter });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const process = await Process.findByPk(req.params.id);

      if (!process) {
        return res.status(400).json({
          errors: ['Processo não encontrado'],
        });
      }

      await process.destroy();

      return res.json({
        msg: 'Processo removido com sucesso!',
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ProcessController();
