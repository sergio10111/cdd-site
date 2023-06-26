import { json, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prismaClient } from "$lib/server/db/prisma.db";

export const DELETE: RequestHandler = async ({params, locals, url, request }) => {
    // get id from the url
    const id = params.id;
    // if no id return 400
    if (!id) {
        return json({
            status: 400,
            message: 'No id provided',
        })
    }
    // get the session and user
    const { session, user } = await locals.auth.validateUser();
    // redirect to login if the user is not logged in
    if (!session) {
        throw redirect(302, '/login');
    }

    // delete crop from database
    try {
        // delete the crop
        await prismaClient.crop.delete({
            where: {
                id: id
            }
        });

        return json({
            status: 200,
            message: 'Crop deleted',
        })
    } catch (error) {
        console.error('Failed to get crops for user', error);
        return json({
            message: 'Failed to get crops for user',
            errorMessage: error,
            status: 500
        })
    }
}

// get crop 
export const GET: RequestHandler = async ({ params, locals, url, request }) => {
    // get id from the url
    const id = params.id;
    // if no id return 400
    if (!id) {
        return json({
            status: 400,
            message: 'No id provided',
        })
    }
    // get the session and user
    const { session, user } = await locals.auth.validateUser();
    // redirect to login if the user is not logged in
    if (!session) {
        throw redirect(302, '/login');
    }

    // get crop from database
    try {
        // get the crop
        const crop = await prismaClient.crop.findUnique({
            where: {
                id: id,
            },
        });

        // if no crop found return 404
        if (!crop) {
            return json({
                status: 404,
                message: 'No crop found for user'
            })
        }

        // return the crop
        return json(crop)
    } catch (error) {
        // log the error
        console.error('Failed to get crop for user', error);
        // return the error
        return json({
            status: 500,
            message: 'Failed to get crop for user',
        })
    }
}
