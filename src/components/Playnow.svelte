<script>
    import { isPlaying } from "../stores/stores";

    function runGame() {
        isPlaying.set(true);
    }
</script>

<div class="playnow-div p-24 flex flex-col items-center">
    <h1 class="text-white text-8xl">
        Welcome to <logo>flipMoji</logo>
    </h1>
    <br>
    <br>
    <button class="rounded py-3 px-6 text-white hover:text-black text-lg" on:click={runGame}>
        Play Now
    </button>
</div>

<style>
    @font-face {
        font-family: 'flipmojifont';
        src: url('../fonts/stereofidelic.ttf');
    }

    logo {
        font-family: flipmojifont;
    }

    button {
        background-color: rgba(3, 37, 255,.8);
        transition-duration: 400ms;
    }

    button:hover {
        background-color: rgba(255, 95, 3,.8);
    }
</style>