import { auth } from "$lib/server/lucia";
import type { Handle } from "@sveltejs/kit";


export async function handle({resolve, event}){
    event.locals.auth = auth.handleRequest(event);

    const response = await resolve(event);
    return response;
} 