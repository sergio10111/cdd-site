<script lang="ts">
	import { navLinks } from '$lib/utils/nav.links';
	import type { LayoutServerData } from "./$types";

    export let data:LayoutServerData

    // get only links that are under dashboard
    $:links = navLinks.filter(link => link.path.includes('/dashboard'))

    // $:console.log('links',links)

    // destructuring the data into reactive values
    $:({
        crops,
        errorMessage,
        message,
        status
    } = data)
</script>

<main class="flex h-full flex-col relative w-full">
    <section class="min-h-full h-full">
        <div class="flex min-h-full flex-col md:flex-row">
            <header class="flex md:sticky md:top-0 md:right-0  p-2 md:bg-neutral-300 w-full flex-col md:max-w-fit">
                <nav class="md:w-36 sticky right-0 top-10 md:bg-white  md:rounded-lg md:shadow-md w-full md:p-6">
                    <ul class="flex justify-evenly md:flex-col">
                        <li>
                            <a class="link link-hover" href="/dashboard">Dashboard</a>
                        </li>
                        {#if links[0].navLinks}
                            {#each links[0].navLinks as link (link.index)}
                                <li >
                                    <a class="link link-hover" href="/dashboard{link.path}">{link.name}</a>
                                </li>
                            {/each}
                            
                        {/if}
                    </ul>
                </nav>
            </header>
            <div class="min-h-full w-full">
                <slot />
            </div>
        </div>
    </section>
</main>