import jwt from 'jsonwebtoken';
import Lawyer from '../models/Lawyer';

class LoginController {
  async store(req, res) {
    const { oab = '', password = '' } = req.body;

    if (!oab || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas.'],
      });
    }

    const lawyer = await Lawyer.findOne({ where: { oab } });

    if (!lawyer) {
      return res.status(401).json({
        errors: ['Advogado não existe.'],
      });
    }

    if (!(await lawyer.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha inválida.'],
      });
    }

    const { id, name, email, cpf } = lawyer;
    const token = jwt.sign({ id, oab }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token, lawyer: { id, name, email, oab: lawyer.oab, cpf } });
  }
}

export default new LoginController();
