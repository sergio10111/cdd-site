<script lang="ts">
	import type { ActionData } from "./$types";

    export let form: ActionData

    $: console.log('form from inspection', form);
</script>

<section class="w-full h-full flex flex-col">
    <div>
        {#if form?.inspection}
            <div class="w-[50vw] p-4 self-center ">
                <img class=" h-28 w-full" src={form.inspection.image} alt="">
                <div>
                    <table class="border rounded-md">
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Value
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each Object.entries(form.inspection) as [key, value]}
                                <tr>
                                    <td>
                                        {key}
                                    </td>
                                    <td>
                                        {value}
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        {/if}
    </div>
    {#if form?.errorMessage}
        <div class="w-[50vw] p-4 self-center ">
            <div class="text-red-500">
                {form.errorMessage}
            </div>
        </div>
    {/if}
    <form enctype="multipart/form-data" class="bg-accent mt-20 self-center w-3/4 box-border p-4 rounded-md border-2 border-primary" method="POST">
        <div>
            <label class="w-full" for="image">
                <input class=" file-input w-full" type="file" name="image" id="image">
            </label>
        </div>
        <br>
        <div>
            <button class=" btn btn-primary" type="submit">
                Submit for inspection
            </button>
        </div>
    </form>
</section>