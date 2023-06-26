import lucia from 'lucia-auth';
import { sveltekit } from 'lucia-auth/middleware';
import { dev } from '$app/environment';
import prisma from '@lucia-auth/adapter-prisma'
import { prismaClient } from './db/prisma.db';

// create a new instance of lucia
export const auth = lucia({
    // set the adapter to prisma
    adapter: prisma(prismaClient),
    // set the environment
    env: dev ? 'DEV' : 'PROD',
    // set the middleware
    middleware: sveltekit(),
    transformDatabaseUser: (user) => {
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }
})

// export the lucia instance
export type Auth = typeof auth;