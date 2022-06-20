/**
 * Supported envs
 */
export enum Env {
  Develop = 'develop',
  Production = 'prod',
  Stage = 'staging',
}

/**
 * Current env dependes on env variable
 */
export const currentEnv: Env = process.env.APP_API_ENV
  ? (process.env.APP_API_ENV as Env)
  : Env.Stage;

export const isMainnet = currentEnv === Env.Production;
