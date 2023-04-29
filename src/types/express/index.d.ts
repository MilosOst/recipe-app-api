export {};

declare global {
    namespace Express {
        export interface Request {
            user: { username: string; email: string; id: string };
        }
    }
}
