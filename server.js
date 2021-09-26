/* eslint-disable no-console */
const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');

const app = express();

const config = require('./config');
const gqlSchema = require('./graphql/schemas');
const gqlResolvers = require('./graphql/resolvers');
const authMiddleware = require('./middlewares/authMiddleware');

const dbAddress = `${config.db.address.replace(/\$USER|\$PASS/gi, (match) => config.db.credential[match])}`;

app.use(bodyParser.json());
app.use(authMiddleware);
app.use(
  '/gql',
  graphqlHTTP({
    schema: gqlSchema,
    rootValue: gqlResolvers,
    graphiql: true,
  })
);

app.get('/ping', (req, res) => {
  res.send('pong!');
});

console.log(chalk.magenta('POKEMON API INITIALIZING . . .'));
mongoose
  .connect(`${dbAddress}/${config.db.name}?retryWrites=true&w=majority`)
  .then(() => {
    console.log(chalk.gray(`Connection to ${chalk.green(config.db.address)} established`));
    app.listen(config.app.port, () => {
      console.log(`${chalk.gray('API is running on port')} ${chalk.green(`${config.app.host}:${config.app.port}`)}`);
    });
  })
  .catch((err) => {
    console.log(`${chalk.red(`Connection to ${dbAddress} failed!`)}`);
    console.log(err);
  });
