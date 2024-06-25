import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import lawyerRoutes from './routes/lawyerRoutes';
import loginRoutes from './routes/loginRoutes';
import clientRoutes from './routes/clientRoutes';
import processRoutes from './routes/processRoutes';

class App {
  constructor() {
    dotenv.config();
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/lawyers', lawyerRoutes);
    this.app.use('/login', loginRoutes);
    this.app.use('/clients', clientRoutes);
    this.app.use('/process', processRoutes);
  }
}

export default new App().app;
