<script lang="ts">
	import { onMount, setContext } from 'svelte';
    import '../app.css'
	import type { LayoutServerData } from './$types';
	import type { AuthUser } from '@prisma/client';
	import Header from '$lib/components/header/Header.svelte';

    export let data:LayoutServerData

    // destructuring the data into reactive values
    $:({ userData} = data)

    // log user
    $:console.log('loaded user on root layout',userData)

    onMount(()=>{
        console.log('mounted')
        setContext<AuthUser>('user', userData)
    })

</script>

<svelte:head>
    <script src="https://kit.fontawesome.com/d20804bf75.js" crossorigin="anonymous"></script>
</svelte:head>

<Header user={userData} />
<slot />