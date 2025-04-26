export const typeDefs = `#graphql
  # Health check type
  type HealthStatus {
    status: String!
    timestamp: String!
    database: DatabaseStatus!
    api: ApiStatus!
  }

  type DatabaseStatus {
    connected: Boolean!
    message: String!
  }

  type ApiStatus {
    status: String!
    message: String!
  }

  # Root Query type
  type Query {
    # Health check query
    health: HealthStatus!
  }
`;