import type { AuthUser } from "@prisma/client";
import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { isAuthorizedNavPath, isUnauthorizedNavPath } from "$lib/utils/nav.links";

export const load:LayoutServerLoad = async ({locals, url}) => {
    
    // get the session and user
    const {session, user} = await locals.auth.validateUser();
    // redirect to login if the user is not logged in
    if (!session && !isUnauthorizedNavPath(url.pathname)){
        throw redirect(302,'/login');
    }

    // redirect to home if the user is logged in
    if (session && isUnauthorizedNavPath(url.pathname)){
        throw redirect(302,'/dashboard');
    }
    // user data
    const userData = user as AuthUser
    return {
        userData
    }
}