import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import type { Crop } from "@prisma/client";

export const load:LayoutServerLoad = async ({locals, url, fetch}) => {
    // get the session and user
    const {session, user} = await locals.auth.validateUser();
    // redirect to login if the user is not logged in
    if (!session){
        throw redirect(302,'/login');
    }
    // redirect to admin if the user is logged in and role is admin
    if (session && user.role === 'ADMIN'){
        throw redirect(302,'/admin');
    }

    // get crops from the database
    try {
        const response = await fetch('/api/user');
        const {crops} = await response.json() as {crops: Crop[]};
        return { crops }
    } catch (error) {
        return {
            status: 500,
            message: 'Failed to get crops for user',
            errorMessage: error,
            crops: []
        }
    }
}