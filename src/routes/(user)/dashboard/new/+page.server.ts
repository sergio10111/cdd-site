import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { Crop } from "@prisma/client";

export const actions: Actions = {
    default: async ({ request, locals, fetch }) => {
        try {
            // get the form data
            const form = await request.formData();
            // log the form data
            console.log('form data', Object.fromEntries(form.entries()));

            // append the image to the form data
            // form.append('image', form.get('image') as File);

            // send the form data to the api
            const response = await fetch('/api/user/inspections/new', {
                method: 'POST',
                body: form,
            });

            // if response is not ok, throw an error
            if (!response.ok) {
                return fail(500, {
                    message: 'Failed to create inspection',
                    errorMessage: await response.text()
                });
            }

            // get the inspection data
            const  { cropFromDb }  = await response.json() as { cropFromDb: Crop };

            const inspection = cropFromDb

            // log the inspection data
            console.log('Inspection data received from db', inspection);

            // return the inspection
            return {
                status: 200,
                inspection
            }
        } catch (error) {
            // log the error
            console.error('Failed to create inspection', error);
            return fail(500, {
                message: 'Failed to create inspection',
                errorMessage: error as string
            });
        }
    }
}