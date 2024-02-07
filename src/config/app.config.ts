declare interface AppConfigOptions {
    mode: string;
    host: string;
    port: number;
}

export const appConfig: AppConfigOptions = {
    mode: process.env.APP_MODE ?? 'development',
    host: process.env.APP_HOST ?? '0.0.0.0',
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3003,
}
