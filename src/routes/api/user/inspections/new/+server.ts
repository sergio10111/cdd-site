import { prismaClient } from "$lib/server/db/prisma.db";
import type { Crop, Role } from "@prisma/client";
import { error, json, redirect, type RequestHandler } from "@sveltejs/kit";
import { CSRF_TOKEN } from "$env/static/private";
import crypto from 'crypto';

// post a new crop
export const POST: RequestHandler = async ({ locals, url, request, fetch }) => {
    // get the session and user
    const { session, user } = await locals.auth.validateUser();
    // redirect to login if the user is not logged in
    if (!session) {
        throw redirect(302, '/login');
    }

    // get image from the request form data
    const formData = await request.formData();
    // log the form data
    console.log('form data on api', Object.fromEntries(formData.entries()));
    // const image = formData.get('image') as File;
    // create blob
    // const imageBlob = new Blob([image], {type: image.type})
    // get the image data
    // const imageData = await imageBlob.arrayBuffer();
    // get the rest of the form data
    // const cropData = JSON.parse(formData.get('cropData') as string) as Crop;



    // get the crop data from the request body
    // const cropJson = JSON.parse(JSON.stringify(await request.json())) as Crop;
    // create the crop
    try {

        // set the boundary
        const boundary = crypto.randomBytes(16).toString('hex');

        // send the image to inspection api
        const inspectionResponse = await fetch('http://127.0.0.1:8000/inspect', {
            method: 'POST',
            // send the image as file data
            body: formData,
            credentials: 'include',
        })

        // if response is not ok, throw an error
        if (!inspectionResponse.ok) {
            throw error(
                inspectionResponse.status,
                {
                    message: `Failed to get inspection data for crop ${await inspectionResponse.text()}`,
                })
        }

        // get the inspection data
        const {message, crop} = await inspectionResponse.json();

        // log the inspection data
        console.log('Inspection data', message, crop);

        // convert the date inspected to a date time
        const dateInspected = new Date(crop.dateInspected).toISOString();

        // create the crop
        const cropFromDb = await prismaClient.crop.create({
            data: {
                id: crypto.randomUUID(),
                name: crop.name,
                dateInspected: dateInspected,
                health: crop.health,
                disease: crop.disease,
                image: crop.image,
                userId: user.id,
                role: user.role as Role,
            },
        })

        // log the crop from db
        console.log('Crop from db', cropFromDb);

        return json({ cropFromDb })
    } catch (error) {
        console.error('Failed to inspect crop', error);
        return json({
            message: 'Failed to inspect crop',
            errorMessage: error
        }, {
            status: 500
        })
    }
}