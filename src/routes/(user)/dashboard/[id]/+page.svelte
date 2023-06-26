<script lang="ts">
	import type { PageServerData } from "./$types";

    export let data:PageServerData

    // get the crop data as reactive
    $: ({ crop } = data);
</script>

<svelte:head>
    <title>
        {crop.name} - {crop.id}
    </title>
</svelte:head>

<section>
    <!-- image -->
    <div class="w-3/4 mx-auto h-fit flex flex-col overflow-hidden justify-evenly items-center border border-primary rounded-lg box-border">
        <div class="w-full h-52 ">
            <img class="w-full h-full" src={crop.image} alt="">
        </div>
        <!-- name and health container -->
        <div class="flex flex-col gap-2">
            <!-- name -->
            <h1 class="text-2xl font-bold">
                {crop.name}
            </h1>
            <!-- health -->
            <div class="flex flex-row gap-2">
                <span class="text-xl">
                    Health:
                </span>
                <span class="text-xl">
                    {crop.health}
                </span>
            </div>
            <!-- disease -->
            <div class="flex flex-row gap-2">
                <span class="text-xl">
                    Disease:
                </span>
                <span class="text-xl">
                    {crop.disease}
                </span>
        </div>
    </div>
</section>