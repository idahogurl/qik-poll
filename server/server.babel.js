import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import fs from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './graphql/resolvers';
import processLogin from './login';

const app = express();

const port = 3000;

app.use('/', express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const typeDefs = fs.readFileSync(path.resolve(__dirname, 'graphql/schema.gql'), 'utf8');
const schema = makeExecutableSchema({ typeDefs, resolvers });
// TODO: Add auth middleware to both endpoints
// TODO: Add user to context: graphqlExpress(req => ({ context: req.user, schema })))
app.use('/graphql', graphqlExpress(req => ({ context: req.user, schema })));
app.get('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.post('/auth/facebook', (req, res, next) => {
  processLogin(req, res, next);
  res.status(500);
});

// Always return the main index.html, so react-router renders the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log('Server Started at port 3000');
});
