type ConfigValues = {
  isDevelopmentEnvironment: boolean;
  cache: {
    host: string;
    port: number;
  };
  database: {
    host: string;
    name: string;
    pass: string;
    port: number;
    type: string;
    user: string;
  };
  hash: {
    salt: number;
  };
  jwt: {
    expiresIn: string;
    secret: string;
  };
};

export default class Config {
  private static values: ConfigValues;
  public static getValues(): ConfigValues {
    if (!Config.values) {
      Config.values = {
        isDevelopmentEnvironment: process.env.NODE_ENV === 'development',
        cache: {
          host: process.env?.REDIS_HOST ?? '',
          port: Number(process.env?.port ?? 6379),
        },
        database: {
          host: process.env?.POSTGRES_HOST ?? '',
          name: process.env?.POSTGRES_DB ?? '',
          pass: process.env?.POSTGRES_PASSWORD ?? '',
          port: Number(process.env?.POSTGRES_PORT ?? 5432),
          type: 'postgres',
          user: process.env?.POSTGRES_USER ?? '',
        },
        hash: {
          salt: Number(process.env?.SALT_ROUNDS ?? 10),
        },
        jwt: {
          expiresIn: process.env?.JWT_EXP ?? '1d',
          secret: process.env?.JWT_SECRET ?? '',
        },
      };
    }

    return Config.values;
  }
}
