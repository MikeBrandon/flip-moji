<script>
    import { cardsOpen } from "../stores/stores";

    export let emoji;
    let viewed = false;

    function handleClick() {
        if (!viewed) {
            cardsOpen.update(n => n-1);
        }
        viewed = true;
    }
</script>

<div class="card-container center flex justify-center items-center" tabindex=0>
    <p class="text-white text-base mr-1">
        {emoji.id + 1}
    </p>
    {#if viewed}
        <button class="h-5/6 w-4/6 bg-white border-black border-solid hover:bg-gray-300 focus:bg-red-400 border-2 rounded-lg flex justify-center items-center cursor-pointer">
            <img src="../images/emojis/{emoji.name}.png" alt="card-1" class="max-w-full max-h-full p-2 shadow-xl">
        </button>
    {:else}
        <button on:click={handleClick} class="h-5/6 w-4/6 bg-white border-black border-solid hover:bg-gray-300 focus:bg-yellow-400 border-2 rounded-lg flex justify-center items-center cursor-pointer">
            <img src="../images/emojis/106-skull.png" alt="card-1" class="max-w-full max-h-full p-2 shadow-xl">
        </button>
    {/if}
</div>