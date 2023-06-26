import { prismaClient } from "$lib/server/db/prisma.db";
import { json, redirect } from "@sveltejs/kit";

// get all inspections
export const GET = async ({ locals }) => {
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

    // try to get the inspections
    try {
        // get the inspections
        const inspections = await prismaClient.crop.findMany({})
        // return the inspections
        return json(inspections)
    } catch (error) {
        // log the error
        console.error('Failed to get inspections', error);
        return json({
            message: 'Failed to get inspections',
            errorMessage: error as string
        })
    }
}