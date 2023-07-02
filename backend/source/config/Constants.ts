import * as dotenv from "dotenv";
dotenv.config();

export abstract class AppConfig {

    static readonly API_VERSION: string = "/api/v1";
    static readonly PORT: any = process.env.PORT ?? 3000;
    static readonly DB_CONNECTION: string = process.env.DB_CONNECTION ?? "";
    static readonly ACCESS_TOKEN_SECRET: string = "VSMa0G6YqBfMVkIibZaF";
    static readonly REFRESH_TOKEN_SECRET: string = "DNmAzjAdNdBb81zrZQjq";

}