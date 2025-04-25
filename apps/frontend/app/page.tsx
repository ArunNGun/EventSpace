'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface HelloResponse {
  message: string;
  timestamp: string;
}

export default function Home() {
  const [data, setData] = useState<HelloResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/hello');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>EventSpace</h1>
        <p className={styles.description}>
          Smart event management and discovery platform
        </p>

        <div className={styles.card}>
          <h2>Backend Connection Test</h2>
          {loading && <p>Loading data from backend...</p>}
          {error && <p className={styles.error}>Error: {error}</p>}
          {data && (
            <div>
              <p><strong>Message:</strong> {data.message}</p>
              <p><strong>Timestamp:</strong> {data.timestamp}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}