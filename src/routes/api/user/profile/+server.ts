import { json, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "../$types";
import { auth } from "$lib/server/lucia";
import { prismaClient } from "$lib/server/db/prisma.db";
import type { UserProfile } from "$lib/utils/models/user.models";

// get user data
export const GET:RequestHandler = async ({locals,url}) => {
    // get the session and user
    const {session, user} = await locals.auth.validateUser();
    // redirect to login if the user is not logged in
    if (!session){
        throw redirect(302,'/login');
    }
    // try to get the user data
    try {
        // get the user data
        const userData = await prismaClient.authUser.findUnique({
            where: {
                id: user.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                crops: true,
                username: true,
                image: true,
            },
        }) as UserProfile;

        // if no user data found return 404
        if (!userData){
            return json({
                status: 404,
                message: 'No user data found for user'
            })
        }

        // return the user data
        return json(userData)
    } catch (error) {
        // log the error
        console.error('Failed to get user data for user',error);
        // return the error
        return json({
            status: 500,
            message: 'Failed to get user data for user',
            errorMessage: error
        })
    }
}

// update user data
export const PUT:RequestHandler = async ({locals,url,request}) => {
    // get the session and user
    const {session, user} = await locals.auth.validateUser();
    // redirect to login if the user is not logged in
    if (!session){
        throw redirect(302,'/login');
    }

    // get the user data
    const userData = await request.json() as UserProfile;

    // try to update the user data
    try {
        // update the user data
        const updatedUserData = await auth.updateUserAttributes(
            userData.id, {
                updatedAt: new Date(Date.now()),
                name: userData.name,
                email: userData.email,
                username: userData.username,
            }
        ) ;

        // return the updated user data
        return json(updatedUserData);
                
    } catch (error) {
        // log the error
        console.error('Failed to update user data for user',error);
        // return the error
        return json({
            status: 500,
            message: 'Failed to update user data for user',
        }) 
    }
}