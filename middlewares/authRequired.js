import jwt from 'jsonwebtoken';
import Lawyer from '../models/Lawyer';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login requerido.'],
    });
  }

  const token = authorization.split(' ')[1];

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, oab } = dados;

    const lawyer = await Lawyer.findOne({
      where: {
        id,
        oab,
      },
    });

    if (!lawyer) {
      return res.status(401).json({
        errors: ['Usuário inválido.'],
      });
    }

    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido.'],
    });
  }
};
