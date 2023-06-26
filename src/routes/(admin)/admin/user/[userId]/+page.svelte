<script lang="ts">
	import CropTile from "$lib/components/crops/CropTile.svelte";
	import type { PageServerData } from "./$types";

    export let data:PageServerData

    // get the user data as reactive
    $: ({ user } = data);
</script>

<svelte:head>
    <title>
        Profile - {user.name}
    </title>
</svelte:head>

<section class="flex flex-col h-fit w-full items-center">
    <div class="mt-6">
        <p>
            User profile for {user.name}
        </p>
    </div>
    <div class="flex flex-col items-center">
        {#if user.crops.length > 0}
            {#each user.crops as inspection (inspection.id)}
                <li class="w-3/4">
                    <CropTile crop={inspection}>
                        <div slot="handle-crop" class="flex flex-col">
                            <a class="btn btn-primary" href="/dashboard/{inspection.id}">
                                View
                            </a>
                            <form action="?/deleteCrop" method="POST">
                                <input type="hidden" name="id" value={inspection.id} />
                                <input type="hidden" name="action" value="delete" />
                                <input type="submit" class="btn btn-error" value="Delete" />
                            </form>
                        </div>
                    </CropTile>
                </li>
            {/each}
        {:else}
            <div class="bg-base-300 w-64 p-2 text-center self-center mt-10 rounded">
                <p>
                    User has not made any inspections yet
                </p>
            </div>
        {/if}
    </div>
</section>