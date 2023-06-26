import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { authorizedNavPaths, isAuthorizedNavPath } from "$lib/utils/nav.links";

export const load:LayoutServerLoad = async ({locals, url}) => {
    // get the session and user
    const {session, user} = await locals.auth.validateUser();
    // redirect to login if the user is not logged in
    if (!session){
        throw redirect(302,'/login');
    }
    // redirect to dashboard if the user is logged in and role is user
    if (session && user.role === 'USER' && !isAuthorizedNavPath(url.pathname)){
        throw redirect(302,'/dashboard');
    }
}