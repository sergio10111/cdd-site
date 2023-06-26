<script lang="ts">
	import type { AuthUser } from "@prisma/client";

    export let user:AuthUser;
</script>

<section class="flex self-center flex-col bg-secondary p-2 w-64">
    <div class="h-36 flex flex-col justify-center bg-secondary-focus">
        {#if user.image}
            <img class="w-full object-cover h-full" src={user.image} alt="">
            {:else}
            <p class="text-center">
                No image
            </p>
        {/if}
    </div>
    <div class="p-4 w-full">
        <p class="flex flex-col">
            <span class="text-secondary-content font-bold">
                Fullnames
            </span>
            {user.name}
        </p>
        <p class="flex flex-col text-secondary-content">
            <span class="text-secondary-content font-bold">
                Email:
            </span>
            {user.email}
        </p>
    </div>
    <div>
        <slot name="handle-user"><!-- optional fallback --></slot>
    </div>
</section>