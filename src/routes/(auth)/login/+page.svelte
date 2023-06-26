<script lang="ts">
	import type { ActionData } from "./$types";
    // function to check password length
    function checkPasswordLength(password:string):string{
        return password.length >= 6 ?  '' : 'Password must be at least 6 characters long';
    }

    // handle form
    export let form:ActionData

    // declare reactive variables for the form
    let email:string = '';
    let password:string = '';
    let checkPassword:boolean = false;

    $: submit = email.length > 0 && password.length >= 6 ? false : true;
    $: passwordLenghtMessage = checkPassword ? checkPasswordLength(password) : '';
</script>

<section class="flex flex-col gap-6">
    <h1 class="text-center my-4">
      Log in to your account
    </h1>
    {#if form?.success === false}
      <div class="w-48 self-center my-2 p-1 bg-error rounded-md">
          <p class=" text-error-content">
            {form.message}
          </p>
      </div>
    {/if}
    <form class=" self-center gap-6 max-w-sm w-full flex flex-col" method="POST">
      <label class="flex flex-col">
        Email
        <input class="input input-bordered" name="email" bind:value={email} />
      </label>
      <label class="flex flex-col">
        Password
        <input class="input input-bordered" name="password" on:input={()=> checkPassword = true} bind:value={password} />
        <span class="text-error">
          {passwordLenghtMessage}
        </span>
        <!-- {
          loginUserAction.value?.failed &&
          <span>
            {loginUserAction.value.fieldErrors?.email}
          </span>
        } -->
      </label>
      <button disabled={submit} class="btn btn-primary" type="submit">
        Log In
      </button>
    </form>
    <p class="text-center flex self-center gap-2">
      Don't have an account?  
      <a class=" link link-primary" href="/register">
        Create one
      </a>
    </p>
    <!-- {loginUserAction.value && (
      <div>
        <h2>User created successfully!</h2>
      </div>
    )} -->
  </section>