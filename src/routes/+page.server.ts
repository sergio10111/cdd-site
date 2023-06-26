import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { auth } from "$lib/server/lucia";

export const actions: Actions = {
    logout: async ({ locals, url }) => {
        console.log('logging out user');
        // try to logout
        try {
            // get the session
            const { session } = await locals.auth.validateUser();
            // if no session, redirect to login
            if (!session) {
                return fail(302,{
                    location: '/login',
                    message: 'No session found'
                });
            }
            // invalidate the session
            await auth.invalidateSession(session.sessionId);
            // remove the session cookie
            locals.auth.setSession(null);

        } catch (error) {
            console.error('Failed to logout', error);
            return fail(500,{
                message: 'Failed to logout',
                errorMessage: error
            })
        }
    }
}