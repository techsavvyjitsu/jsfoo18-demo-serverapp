import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import errorhandler from 'errorhandler';

// GraphQL specific imports
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from '../resources/typeDefs';
import resolvers from '../resources/resolvers';

// Create Express server instance
const app = express();

// Globals
const { NODE_ENV } = process.env;

// Setup body-parser middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup GraphQL routes
const END_POINTS = {
  API: '/graphql',
  DEBUGGER: '/graphiql',
};

app.use(
  END_POINTS.API,
  graphqlExpress((req, res) => {
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });

    return {
      schema,
      context: {
        req,
        res,
      },
    };
  })
);

let defaultRedirect = END_POINTS.API;
if (NODE_ENV === 'development') {
  // Setup GraphQL routes for debugger
  app.use(
    END_POINTS.DEBUGGER,
    graphiqlExpress({
      endpointURL: END_POINTS.API,
    })
  );
  defaultRedirect = END_POINTS.DEBUGGER;
}

// Setup root routes to redirect to GraphQL route
// const endpointURL = (NODE_ENV === 'development') ? '/graphiql' : '/graphql';
app.use('/', (req, res, next) => res.redirect(defaultRedirect));

// Setup compression middleware to compress all requests
app.use(compression());

// Setup helmet middleware for security like csp, xss, nocache, poweredby etc.
app.use(helmet());

// Setup cors middleware to enable/disable/filter cross-origin requests
app.use(cors());

// Setup errorhandler middleware
app.use(errorhandler());

export default app;
