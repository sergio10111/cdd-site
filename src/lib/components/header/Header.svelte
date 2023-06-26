<script lang="ts">
	import { navLinks } from "$lib/utils/nav.links";
	import type { AuthUser } from "@prisma/client";
	import { getContext } from "svelte";
	import type { ActionData } from "../../../routes/$types";

    // get the form data
    // export let form:ActionData

    // get user from context
    export let user:AuthUser
</script>

<header>
    <nav>
        <ul class="flex justify-center gap-10">
            <li>
                <a href="/">Home</a>
            </li>

            {#if user}
                {#if user.role === 'USER'}
                    <li>
                        <a href="/dashboard">Dashboard</a>
                    </li>
                {:else if user.role === 'ADMIN'}
                    <li>
                        <a href="/login">Login</a>
                    </li>
                    <li>
                        <a href="/register">Register</a>
                    </li>
                {:else}
                    {#if navLinks}
                        {#each navLinks as link (link.index)}
                            <li>
                                <a href="{link.path}">{link.name}</a>
                            </li>
                        {/each}
                    {/if}
                {/if}
            <form method="POST"  action="/?/logout">
                <span >
                    <button type="submit">
                        Log out
                        <!-- <i class="fa-solid fa-right-to-bracket text-xl" >
                        </i> -->
                    </button>
                </span>
            </form>
            {/if}
        </ul>
    </nav>
</header>