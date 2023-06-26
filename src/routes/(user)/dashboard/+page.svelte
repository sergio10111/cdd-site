<script lang="ts">
	import CropTile from "$lib/components/crops/CropTile.svelte";
    import type { ActionData, PageServerData } from "./$types";
    // get data from load function
    export let data:PageServerData
    // get form data
    export let form: ActionData

    // get inspections from data
    $:({ inspections, errorMessage, status} = data)
</script>

<svelte:head>
    <title>
        Dashboard
    </title>
</svelte:head>

<section class="flex flex-col h-full pt-10">
    <div class="flex flex-col">
        <h1 class="text-2xl text-center font-bold">
            Inspections
        </h1>
        <div class="self-center mt-4 mb-6">
            <p>
                Create a new inspection
                <a class="btn btn-info p-2" href="/dashboard/new">
                    Click here
                </a>
            </p>
        </div>
    </div>
    {#if inspections}
        {#if inspections.length > 0}
            <ul class="flex flex-col w-full items-center gap-2">
                {#each inspections as inspection (inspection.id)}
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
            </ul>
        {:else}
        <div class="bg-base-300 w-64 p-2 text-center self-center mt-10 rounded">
            <div>
                <p>
                    No inspections found
                </p>
                Click 
                <a class="link text-lg link-primary link-hover" href="/dashboard/new">
                    here
                </a> to detect new crop
            </div>
        </div>
        {/if}
    {:else}
    <div class="bg-base-300 w-64 p-2 text-center self-center mt-10 rounded">
        <div>
            <p>
                No inspections found
            </p>
            Click 
            <a class="link text-lg link-primary link-hover" href="/dashboard/inspections/new">
                here
            </a> to detect new crop
        </div>
    </div>
    {/if}
</section>