<script lang="ts">
	import type { Crop } from "@prisma/client";

    export let crop:Crop;
</script>

<section class="flex bg-secondary border rounded-lg border-primary gap-6">
    <div class="h-full w-full rounded-l-md overflow-hidden">
        <img src={crop.image} alt={crop.name}>
    </div>
    <div class=" text-sm">
        <p>
            <span>
                Name of crop:
            </span>
            {crop.name}
        </p>
        <p>
            <span>
                Health:
            </span>
            {crop.health}
        </p>
    </div>
    {#if crop.health !== 'Healthy'}
        <p class=" text-sm">
            <span>
                Disease:
            </span>
            {crop.disease}
        </p>
    {/if}
    <div>
        <slot name="handle-crop"><!-- optional fallback --></slot>
    </div>
</section>