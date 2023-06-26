import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import type { AuthUser } from "@prisma/client";

export const load: PageServerLoad = async ({ request, locals, fetch }) => {
        try {
            // try to get all users from the api
            const response = await fetch('/api/admin/users',{
                method: 'GET',
            });

            // if response is not ok, throw an error
            if (!response.ok) {
                return fail(500, {
                    message: 'Failed to get users',
                    errorMessage: await response.text()
                });
            }

            // get the users
            const users = await response.json() as AuthUser[];

            // return the users
            return {
                status: 200,
                users
            }
        } catch (error) {
            // log the error
            console.error('Failed to get users', error);
            return fail(500, {
                message: 'Failed to get users',
                errorMessage: error as string
            })
        }
    }


export const actions: Actions = {
    deleteUser: async ({ request, fetch }) => {
        // try to delete the user
        try {
            // get the form data
            const formData = await request.formData();
            // get the id from the form data
            const id = formData.get('id') as string;
            // log the id
            console.log('id of user to be deleted', id);
            // if no id return an error
            if (!id) {
                return fail(400, {
                    message: 'No id provided',
                });
            }

            // delete the user
            const response = await fetch(`/api/admin/users/${id}`, {
                method: 'DELETE',
            });

            // if the response is not ok
            if (!response.ok) {
                return fail(402, {
                    message: await response.text(),
                });
            }

            // return the response
            return {
                status: 200,
                message: 'User deleted successfully',
            }
        } catch (error) {
            // log the error
            console.error('Failed to delete user', error);
            return fail(500, {
                message: 'Failed to delete user',
                errorMessage: error as string
            })
        }
    }
}