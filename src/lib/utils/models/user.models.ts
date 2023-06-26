import type { Crop } from "@prisma/client";

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    crops: Crop[];
    username: string;
    image: string;
}