<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import type { ActionData } from "./$types";


    // handle form
    export let form:ActionData

    // handle form validation
    let email:string = '';
    let password:string = '';
    let role:string = 'USER';
    let name:string = '';
    let username:string = '';
    let createdAt:Date = new Date(Date.now());
    let updatedAt:Date = new Date(Date.now());

    $: console.log(form)
</script>

<section class="flex flex-col w-full items-center">
    <div class="flex flex-col w-full">
        <h1 class="text-center">Register your account</h1>
        <div class="self-center">
           {#if form?.message}
            <p>
                {form.message}
            </p>
           {/if}
        </div>
        <form 
            class=" self-center gap-6 max-w-sm w-full flex flex-col" 
            method="POST"
            >
            <label class="flex flex-col">
                Email
                <input class="input input-bordered" name="email" bind:value={email} />
            </label>
            <label class="flex flex-col">
                Password
                <input class="input input-bordered" name="password" bind:value={password} />
                <!-- {
                    createUserAction.value?.failed &&
                    <span>
                        {createUserAction.value.fieldErrors?.email}
                    </span>
                    todo: add error handling
                } -->
            </label>
            <fieldset class="flex flex-col gap-6">
               <div class="flex flex-col gap-4">
               <label class="flex flex-col" for='username'>
                    Username
                    <input class="input input-bordered" type="text" bind:value={username} name="username" id="username" />
                </label>
                <label class="flex flex-col" for='name'>
                    Full names
                    <input class="input input-bordered" type="text" bind:value={name} name="name" id="name" />
                </label>
               </div>
               <select bind:value={role} class="select select-bordered" title='Select role' name="role" id="role">
                <option class="h-12" value="ADMIN">
                    Admin
                </option>
                <option value="USER">
                    Farmer
                </option>
               </select>
            </fieldset>
            <!-- hidden inputs -->
            <input type="hidden" name="createdAt" value={createdAt} />
            <input type="hidden" name="updatedAt" value={updatedAt} />
            <p class="text-end flex self-end gap-2">
                Already have an account?  
                <a class=" link link-hover link-primary" href="/login">
                  Log in
                </a>
              </p>
            <button class="btn btn-primary" type="submit">
                Register
            </button>
        </form>
    </div>
</section>