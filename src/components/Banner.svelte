<script>
    import Main from "./Main.svelte";
    import Playnow from "./Playnow.svelte";
    import { isPlaying } from "../stores/stores";
</script>

<div class="bg-home w-screen flex items-center justify-center h-screen">
    {#key $isPlaying}
        {#if $isPlaying}
            <Main/>
        {:else}
            <Playnow/>
        {/if}
    {/key}
</div>

<style>
    @font-face {
        font-family: 'mainfont';
        src: url('../fonts/doland.otf');
    }

    * {
        font-family: 'mainfont';
    }

    .bg-home {
        background-color: rgba(255,222,3,1);
        background-image: url("../images/home-img.jpg");
        background-position: center 35%;
        background-blend-mode: multiply;
    }
</style>