import { json, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prismaClient } from "$lib/server/db/prisma.db";
import type { UserProfile } from "$lib/utils/models/user.models";

export const GET: RequestHandler = async ({locals, params}) => {
    console.info('Getting user by admin');
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
    
    // try to get the user
    try { 
        // get id from params
        const { id } = params;
        // if no id return 404
        if (!id) {
            return json({
                status: 404,
                message: 'No user id provided',
            })
        }
        // get the user
        const user = await prismaClient.authUser.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                name: true,
                username: true,
                role: true,
                image: true,
                createdAt: true,
                updatedAt: true,
                crops: true,
            }
        }) as UserProfile

        // log the user
        console.log('User got by admin', user);

        return json(user)
    } catch (error) {
        // log the error
        console.error('Failed to get users', error);
        return json({
            message: 'Failed to get users',
            errorMessage: error as string
        })
    }
}

// delete user
export const DELETE: RequestHandler = async ({locals, params}) => {
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

    // try to delete the user
    try {
        // get id from params
        const { id } = params;
        // if no id return 404
        if (!id) {
            return json({
                status: 404,
                message: 'No user id provided',
            })
        }
        // delete the user
         await prismaClient.authUser.delete({
            where: {
                id: id
            }
        }) 

        // log the user
        console.log('User deleted by admin', user);

        return json('User deleted')
    } catch (error) {
        // log the error
        console.error('Failed to delete user', error);
        return json({
            message: 'Failed to delete user',
            errorMessage: error as string
        })
    }
}