<script lang="ts">
	import { page } from "$app/stores";
	import UserTile from "$lib/components/users/UserTile.svelte";
	import type { PageServerData } from "./$types";

    export let data:PageServerData

    // get the user data as reactive
    $: ({ users } = data);
</script>

<svelte:head>
    <title>
        Admin - Users
    </title>
</svelte:head>

<section class="flex flex-col min-h-full w-full">
    <div class="w-full flex flex-col items-center">
        <h1 class="text-2xl font-bold">
            Users
        </h1>
        <div class="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 w-full">
            {#if users}
                {#if users.length === 0}
                    <span class="text-xl">
                        No users
                    </span>
                {/if}
                {#each users as user (user.id)}
                    <UserTile {user} >
                        <div slot="handle-user" class="flex w-full gap-2 box-border">
                            <form action="?/deleteUser" method="POST">
                                <input value={user.id} type="hidden" name="id" id="id">
                                <button class="btn btn-warning" type="submit">
                                    Delete user
                                </button>
                            </form>
                            <a class="btn btn-info box-border" href="admin/user/{user.id}">
                                View info
                            </a>
                        </div>
                    </UserTile>
                {/each}
            {/if}
        </div>
    </div>
</section>