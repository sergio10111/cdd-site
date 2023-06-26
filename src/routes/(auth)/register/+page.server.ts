import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { auth } from "$lib/server/lucia";
import { LuciaError } from "lucia-auth";
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

export const actions:Actions = {
    default: async ({request, locals}) => {
        // get the form data
        const form = await request.formData();
        // log the form data
        console.log('form data',Object.fromEntries(form.entries()));
        // get the email and password
        const email = form.get('email')?.toString();
        const password = form.get('password')?.toString();
        // get the name, username, role, createdAt, and updatedAt
        const name = form.get('name')?.toString();
        const username = form.get('username')?.toString();
        const role = form.get('role')?.toString();
        const createdAt = form.get('createdAt');
        const updatedAt = form.get('updatedAt');

        // check if the email and password are valid
        if (!email || !password) {
            console.error('Email and password are required');
            return fail(400,{
                message: 'Email and password are required',
            });
        }

        // check if email and password are not empty
        if (typeof email !== 'string' || typeof password !== 'string') {
            console.error('Email and password are required');
            return fail(400, {
                message: 'Email and password are required',
            });
        }

        if(email.length === 0 || password.length === 0){
            return fail(400, {
                message: 'Email and password are required',
            });
        }

        // check if the name, username, role, createdAt, and updatedAt are valid
        if (!name || !username || !role || !createdAt || !updatedAt) {
            return fail(400,{
                message: 'Name, username, role, createdAt, and updatedAt are required',
            });
        }

        // convert the createdAt and updatedAt to Date
        const createdAtDate = new Date(createdAt?.toString() || '');
        const updatedAtDate = new Date(updatedAt?.toString() || '');

        let success = false;

        // try to register
        try {
            // register the user
            await auth.createUser({
                primaryKey: {
                    providerId: 'email',
                    providerUserId: email,
                    password: password
                },
                attributes: {
                    name: name,
                    username: username,
                    email: email,
                    role: role,
                    createdAt: createdAtDate,
                    updatedAt: updatedAtDate
                }
            })

            success = true;

        } catch (e) {
            console.error('Register error',e as string);

            if (e instanceof LuciaError) {
                return fail(400, {
                    success: false,
                    message: e.message.toString(),
                });
            } else if(e instanceof PrismaClientValidationError){
                return fail(400, {
                    success: false,
                    message: e.message.toString(),
                });
            } else if(e instanceof PrismaClientKnownRequestError){
                return fail(400, {
                    success: false,
                    message: e.message,
                });
            } else if(e instanceof PrismaClientUnknownRequestError){
                return fail(400, {
                    success: false,
                    message: e.message.toString(),
                });
            } else if(e instanceof Error) {
                return fail(400, {
                    success: false,
                    message: e.message.toString(),
                });
            }
            return fail(400, {
                success: false,
                message: e as string,
            });
        }

        if(success){
           throw redirect(302, '/login');
        }
        
    },
}