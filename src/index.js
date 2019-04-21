import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import DataLoader from 'dataloader';
import express from 'express';
import {
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';
import loaders from './loaders';

const app = express();

app.use(cors());

app.use(morgan('dev'));

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        loaders: {
          bank: new DataLoader(keys =>
            loaders.bank.batchBanks(keys, models)
          ),
          branch: new DataLoader(keys =>
            loaders.branch.batchBranches(keys, models)
          )
        },
      };
    }

    if (req) {
      return {
        models,
        loaders: {
          bank: new DataLoader(keys =>
            loaders.bank.batchBanks(keys, models)
          ),
          branch: new DataLoader(keys =>
            loaders.branch.batchBranches(keys, models)
          )
        },
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const isTest = !!process.env.TEST_DATABASE;
const isProduction = !!process.env.DATABASE_URL;
const port = process.env.PORT || 8000;

sequelize.sync({ force: isTest || isProduction }).then(async () => {
  // if (isTest || isProduction) {
    await createBanks();
    await createBranches();
  // }

  httpServer.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`);
  });
});

const createBanks = async () => {
  await models.Bank.create(
    { name: 'Bank 1' }
  );
  await models.Bank.create(
    { name: 'Bank 2' }
  );
  await models.Bank.create(
    { name: 'Bank 3' }
  );
};

const createBranches = async () => {
  await models.Branch.create(
    { name: 'Branch 1' }
  );
  await models.Branch.create(
    { name: 'Branch 2' }
  );
  await models.Branch.create(
    { name: 'Branch 3' }
  );
};
