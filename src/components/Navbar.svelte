<script>
    export let showNav = "";
    export let textClass = "";

    const BUTTON_CLASS = "tracking-widest h-10 items-center mr-4 inline-flex justify-center self-center py-1 px-3 rounded text-white transition-all border-white font-medium hover:text-black";
</script>

<div class="{showNav} p-3 text-black flex fixed w-full transition-all">
    <p class="{textClass} text-5xl ml-4 logo">flipMoji</p>
    <nav class="buttons flex ml-auto">
        <!--
            <button class={BUTTON_CLASS}>
                Play
            </button>
        -->
        <button class={BUTTON_CLASS}>
            Leaderboard
        </button>
    </nav>
</div>

<style>
    @font-face {
        font-family: 'flipmojifont';
        src: url('../fonts/stereofidelic.ttf');
    }

    @font-face {
        font-family: 'mainfont';
        src: url('../fonts/doland.otf');
    }

    p {
        font-family: flipmojifont;
        -webkit-user-select: none; /* Safari */        
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
    }

    .nav-container {
        background-color: #ffde03;
        transition-duration: 400ms;
    }

    button {
        font-family: 'mainfont';
        background-color: #0325ff;
        transition-duration: 400ms;
    }

    button:hover {
        background-color: #ff5f03;
    }

    .logo {
        color: #ffde03;
    }

    .textwhite {
        color: black;
        transition-duration: 400ms;
    }
    
</style>