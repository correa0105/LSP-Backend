import jwt from 'jsonwebtoken';
import Lawyer from '../models/Lawyer';

const getLawyerByToken = async (token) => {
  if (!token) {
    return res.status(401).json({ message: 'Você não está autenticado.' });
  }

  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

  const lawyerId = decoded.id;

  const laywer = await Lawyer.findByPk(lawyerId);

  return laywer;
};

export default getLawyerByToken;
