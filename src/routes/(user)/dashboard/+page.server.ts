import type { Crop } from "@prisma/client";
import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

// our load function to get inspection data
export const load: PageServerLoad= async ({ locals, url, fetch }) => {
    // try to get our inspection data
    try {
        const response = await fetch('/api/user/inspections');

        // if response is not ok, throw an error
        if (!response.ok) {
            throw error(response.status, 'Failed to get inspections for user');
        }

        // if we get a 404, return an empty array
        if (response.status === 404) {
            return { inspections: [] }
        }
        const { crops } = await response.json() as { crops: Crop[] };

        const inspections = crops
        return { inspections }
    } catch (error) {
        console.error('Failed to get crops for user', error);
        return {
            status: 500,
            message: 'Failed to get inspections for user',
            errorMessage: error as string,
            inspections: []
        }
    }
}

export const actions: Actions = {
    deleteCrop: async ({ request, fetch }) => {
        // try to delete the crop
        try {
            // get the form data
            const formData = await request.formData();
            // get the id from the form data
            const id = formData.get('id') as string;
            // log the id
            console.log('id of crop to be deleted', id);
            // if no id return an error
            if (!id) {
                return fail(400, {
                    message: 'No id provided',
                });
            }

            // delete the crop
            const response = await fetch(`/api/user/inspections/${id}`, {
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
                message: 'Crop deleted',
            }

        } catch (error) {
            // log the error
            console.error('Failed to delete crop', error);
            // throw the error
            return fail(500, {
                message: error as string,
            });
        }
    }
}