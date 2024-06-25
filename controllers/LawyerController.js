import Lawyer from '../models/Lawyer';
import Client from '../models/Client';

import getToken from '../helpers/getToken';
import getLawyerByToken from '../helpers/getLawyerByToken';

class LawyerController {
  async store(req, res) {
    try {
      const { confirmpassword } = req.body;
      const { password } = req.body;

      if (confirmpassword !== password) {
        return res.status(400).json({
          errors: ['As senhas não conferem.'],
        });
      }

      const newLawyer = await Lawyer.create(req.body);

      return res.json({
        id: newLawyer.id,
        name: newLawyer.name,
        cpf: newLawyer.cpf,
        oab: newLawyer.oab,
        email: newLawyer.email,
        password: newLawyer.password,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    const token = getToken(req);
    const lawyer = await getLawyerByToken(token);

    try {
      const clients = await Client.findAll({
        where: {
          lawyer_id: lawyer.id,
        },
      });

      const result = {
        lawyer: {
          id: lawyer.id,
          name: lawyer.name,
          cpf: lawyer.cpf,
          oab: lawyer.oab,
          email: lawyer.email,
        },
        clients: [],
      };

      clients.forEach((item) => {
        result.clients.push(item.dataValues);
      });

      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    const token = getToken(req);
    const lawyer = await getLawyerByToken(token);

    try {
      if (!lawyer) {
        return res.status(400).json({
          errors: ['Advogado não encontrado!'],
        });
      }

      const attLawyer = await lawyer.update(req.body);

      const { id, name, cpf, oab, email } = attLawyer;

      return res.json({
        msg: 'Dados atualizados com sucesso!',
        user: {
          id,
          name,
          cpf,
          oab,
          email,
        },
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    const token = getToken(req);
    const lawyer = await getLawyerByToken(token);

    try {
      if (!lawyer) {
        return res.status(400).json({
          errors: ['Advogado não encontrado!'],
        });
      }

      await lawyer.destroy();

      return res.json({
        msg: 'Advogado removido com sucesso!',
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new LawyerController();
