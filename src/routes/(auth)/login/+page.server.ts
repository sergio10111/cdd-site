import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { auth } from "$lib/server/lucia";
import { LuciaError } from "lucia-auth";

export const actions:Actions = {
    default: async ({request, locals}) => {
        // get the form data
        const form = await request.formData();
        // get the email and password
        const email = form.get('email')?.toString();
        const password = form.get('password')?.toString();

        // check if the email and password are valid
        if (!email || !password) {
            return fail(400,{
                missing: true,
                message: 'Email and password are required',
            });
        }

        // check if email and password are not empty
        if (typeof email !== 'string' || typeof password !== 'string') {
            return fail(400, {
                missing: true,
                message: 'Email and password are required',
            });
        }

        // try to login
        try {
            const key = await auth.useKey('email', email, password);
            // create session
            const session = await auth.createSession(key.userId);
            // set the session cookie
            locals.auth.setSession(session);

            return {
                success: true,
                message: 'Login successful',
            }
        } catch (error) {
            console.error('Login error',error as string);

            if (error instanceof LuciaError) {
                return fail(400, {
                    success: false,
                    message: error.message.toString(),
                });
            }
            return fail(400, {
                success: false,
                message: 'Invalid email or password',
            })
        }
    }
}