import { prismaClient } from "$lib/server/db/prisma.db";
import { json, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "../$types";
import type { Crop } from "@prisma/client";

export const GET: RequestHandler = async ({ locals, url }) => {
    // get the session and user
    const { session, user } = await locals.auth.validateUser();
    // redirect to login if the user is not logged in
    if (!session) {
        throw redirect(302, '/login');
    }

    // get crops from the database
    try {
        const crops = await prismaClient.crop.findMany({
            where: {
                userId: user.id
            }
        });

        // if no crops found return 404
        if (!crops) {
            return json({
                status: 404,
                message: 'No crops found for user',
            })
        }

        // return the crops
        return json({ crops })
    } catch (error) {
        console.error('Failed to get crops for user', error);
        return json({
            message: 'Failed to get crops for user',
            errorMessage: error,
            status: 500
        })
    }
}


