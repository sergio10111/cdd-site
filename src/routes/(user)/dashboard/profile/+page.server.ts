import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import type { UserProfile } from "$lib/utils/models/user.models";

export const load:PageServerLoad = async ({locals,fetch}) => {
    // try to get the user data
    try {
        // get the user data from the api
        const userData = await fetch('/api/user/profile',{
            method: 'GET',
        });
        // if the user data is not ok
        if (!userData.ok){
            // throw the error
            throw error(402,{
                message: await userData.text(),
            });
        }

        // get the user data
        const user = await userData.json() as UserProfile;

        // return the user data
        return {
            user
        }
    } catch (e) {
        // log the error
        console.error('Failed to get user data for user',e);
        // return the error
        throw error(500,{
            message: e as string,
        })
    }
}

export const actions:Actions = {
    updateUser: async ({request,fetch, locals}) => {
        type UpdatedUserData = {
            id: string;
            name: string;
            username: string;
            email: string;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        }
    }
}