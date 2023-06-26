import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import type { Crop } from "@prisma/client";

export const load:PageServerLoad = async ({locals,fetch, params}) => {
    // try to get the crop data
    try {
        // get id from params
        const id = params.id;
        // if no id throw error
        if (!id) {
            throw error(400,{
                message: 'No id provided',
            });
        }

        // get the crop from the api
        const response = await fetch(`/api/user/inspections/${id}`,{
            method: 'GET',
        })

        // if the response is not ok
        if (!response.ok){
            throw error(402,{
                message: await response.text(),
            });
        }

        // get the crop data
        const crop = await response.json() as Crop;

        // return the crop data
        return { crop }
    } catch (e) {
        // log the error
        console.error('Failed to get crop data for user',e);
        // throw the error
        throw error(500,{
            message: e as string,
        })
    }
}

