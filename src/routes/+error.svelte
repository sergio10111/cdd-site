<script lang="ts">
	import { page } from '$app/stores';
    
</script>

<svelte:head>
    <title>
        Error - {$page.url.pathname}
    </title>
</svelte:head>

<section class=" bg-error w-full h-full flex flex-col justify-center items-center text-error-content">
    <div>
        <p>
            Error: {$page.url.pathname} not found
        </p>
        <p>
            {$page.error?.message}
            <a href="/">Go home</a>
        </p>
    </div>
</section>