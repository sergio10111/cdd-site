<script lang="ts">
	import type { PageServerData } from "./$types";

    export let data:PageServerData

    // get the user data as reactive
    $: ({ user } = data);

    $: submit = false

</script>

<svelte:head>
    <title>
        Profile - {user.name}
    </title>
</svelte:head>

<section class="flex flex-col gap-6">
    <p>
        Functionality to update user profile not implemented yet.
    </p>
    <form class="p-6 max-w-lg w-full flex flex-col gap-6 self-center" action="">
        <div class="w-full h-72 flex flex-col justify-evenly items-center border border-primary rounded-lg box-border">
            <div class="w-full h-52">
                <img class="w-full h-full" src={user.image} alt="">
            </div>
            <label for="image w-full h-full">
                <input class=" file-input file-input-primary" type="file" name="image" id="image" value={user.image} />
            </label>
        </div>
        <fieldset class="border border-primary flex flex-col gap-6 rounded-lg p-4">
            <legend>
                Profile
            </legend>
            <label class="input-group" for="name">
                <span>
                    Name
                </span>
                <input class="input input-bordered" type="text" name="name" id="name" value={user.name} />
            </label>
            <label class="input-group" for="email">
                <span>
                    Email
                </span>
                <input class="input input-bordered" type="email" name="email" id="email" value={user.email} />
            </label>
            <label class="input-group" for="username">
                <span>
                    Username
                </span>
                <input class="input input-bordered" type="text" name="username" id="username" value={user.username} />
            </label>
        </fieldset>
        <button disabled={submit} class="btn btn-primary w-full" type="submit">
            Update
        </button>
    </form>
</section>