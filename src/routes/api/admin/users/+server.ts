import { prismaClient } from "$lib/server/db/prisma.db";
import { json, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals }) => {
    // get the session and user
    const { session, user } = await locals.auth.validateUser();
    // redirect to login if the user is not logged in
    if (!session) {
        throw redirect(302, '/login');
    }
    // redirect to dashboard if the user is not an admin
    if (user.role !== 'ADMIN') {
        throw redirect(302, '/dashboard');
    }
    
    // try to get the users
    try {
        // get the users
        const users = await prismaClient.authUser.findMany({
            where: {
                role: 'USER'
            }
        })

        return json(users)
    } catch (error) {
        // log the error
        console.error('Failed to get users', error);
        return json({
            message: 'Failed to get users',
            errorMessage: error as string
        })
    }
}