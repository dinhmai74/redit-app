declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string
    CORS_ORIGIN: string;
    DATABASE_URL: string;
    APOLLO_KEY: string;
    APOLLO_GRAPH_ID: string;
    APOLLO_GRAPH_VARIANT: string;
    APOLLO_SCHEMA_REPORTING: string;
    APOLLO_SERVER_PLATFORM: string;
    log_level: string;
  }
}