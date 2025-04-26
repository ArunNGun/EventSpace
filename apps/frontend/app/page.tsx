'use client';

import { useQuery, gql } from '@apollo/client';
import styles from './page.module.css';

const HEALTH_QUERY = gql`
 query Health {
  health {
    status
    timestamp
    database {
      connected
      message
    }
    api {
      status
      message
    }
  }
}
`;

interface HealthResponse {
  health: {
    status: string;
    timestamp: string;
    api: {
      status: string;
      message: string;
    };
    database: {
      connected: boolean;
      message: string;
    };
  };
}

export default function Home() {
  const { data, loading, error } = useQuery<HealthResponse>(HEALTH_QUERY);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>EventSpace</h1>
        <p className={styles.description}>
          Smart event management and discovery platform
        </p>

        <div className={styles.card}>
          <h2>GraphQL Health Check</h2>
          {loading && <p>Loading data from GraphQL API...</p>}
          {error && <p className={styles.error}>Error: {error.message}</p>}
          {data && (
            <div>
              <p><strong>API Status:</strong> {data.health.api.status}</p>
              <p><strong>API Message:</strong> {data.health.api.message}</p>
              <p><strong>Database Connected:</strong> {data.health.database.connected ? 'Yes' : 'No'}</p>
              <p><strong>Database Message:</strong> {data.health.database.message}</p>
              <p><strong>Timestamp:</strong> {data.health.timestamp}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}