<script>
    import { onMount } from "svelte";
    import Card from "./card.svelte";
    import { isPlaying, showingHighScore, score, cardsOpen, timeRem, highScore, gameIsActive } from "../stores/stores";
    import Timer from "./Timer.svelte";
    import Loader from "./Loader.svelte";
    import { fade } from "svelte/transition";

    const emojis = [
        {"id": 0, "name": "001-alien"},
        {"id": 1, "name": "002-amazed"},
        {"id": 2, "name": "003-amazed"},
        {"id": 3, "name": "004-amazed"},
        {"id": 4, "name": "005-anger"},
        {"id": 5, "name": "006-anger"},
        {"id": 6, "name": "007-angry"},
        {"id": 7, "name": "008-angry"},
        {"id": 8, "name": "009-baby"},
        {"id": 9, "name": "010-kiss"},
        {"id": 10, "name": "011-kiss"},
    ];

    let picked = [
        {"id": 0, "name": ""},
        {"id": 1, "name": ""},
        {"id": 2, "name": ""},
        {"id": 3, "name": ""},
        {"id": 4, "name": ""}
    ];

    let cards = [
        {"id": 0, "name": ""},
        {"id": 1, "name": ""},
        {"id": 2, "name": ""},
        {"id": 3, "name": ""},
        {"id": 4, "name": ""},
        {"id": 5, "name": ""},
        {"id": 6, "name": ""},
        {"id": 7, "name": ""},
        {"id": 8, "name": ""},
    ];

    let instructions = "Click on a card to see what image is underneath it and try to find the image that appears odd number of times and input it below.";
    timeRem.set(60)
    gameIsActive.set(false);
    cardsOpen.set(10);
    let timerRunning = false;
    let timer = 3;
    let ans;
    let finalAns;
    let resetKey = true;
    let rng = 0;
    let reply = "";
    let gameTimerRunning = false;
    $: disabled = reply.length < 1;
    showingHighScore.set(false);

    function pickRandomEmojis() {
        for (let i = 0; i < picked.length; i++) {
            let item = emojis[Math.floor(Math.random() * emojis.length)];
            picked[i].name = item.name;
        }
        ans = Math.floor(Math.random() * 5);

        cardsOpen.set(10);
        picked.forEach(pick => {
            if (pick.id === ans) {
                setUpCards(pick,1);
            } else {
                setUpCards(pick,0);
                setUpCards(pick,0);
            }
        });
    }

    function setUpCards(pick, type) {
        while (cards[rng].name.length > 1) {
            rng = Math.floor(Math.random() * 9);
        }
        cards[rng].name = pick.name;
        if (type === 1) {
            finalAns = pick.name;
        }
    }

    function stopGame() {
        isPlaying.set(false);
    }

    function startGame() {
        gameIsActive.set(true);
        timerRunning = true;
        timeRem.set(60);

        setInterval(() => {
            timer -= 1;
        }, 1000);

        setTimeout(() => {
            timerRunning = false;
            gameTimerRunning = true;
        },3000);
    }

    function submitHandler() {
        if (cards[(reply-1)].name === finalAns) {
            score.set($cardsOpen * $timeRem);
            resetKey = false;
            if ($score > $highScore) {
                highScore.set($score);
            }
            setTimeout(() => {
                gameIsActive.set(false);
                showingHighScore.set(true);
            }, 1000);
        } else {
            resetKey = false;
            setTimeout(() => {
                gameIsActive.set(false);
                showingHighScore.set(true);
            }, 1000);
        }
    }

    onMount(() => {
        pickRandomEmojis();
        score.set(0);
    });
</script>

<div class="w-1/2 h-2/3 flex">
    {#if $gameIsActive && !timerRunning}
        <left class="bg-black w-2/3 h-full justify-center items-center flex">
            {#if resetKey}
                <div class="h-5/6 w-5/6 grid grid-flow-row grid-cols-3">
                    {#each cards as emoji (emoji.id)}
                        <Card emoji = {emoji}/>
                    {/each}
                </div>
            {:else}
                <Loader/>
            {/if}
        </left>
    {:else if $showingHighScore}
        <left class="bg-black w-2/3 h-full justify-center items-center flex flex-col">
            <p class="text-white font-normal tracking-widest text-3xl">
                Your Score
            </p>
            <p class="text-white text-4xl">
                {$score}
            </p>
            <br>
            <p class="text-white font-normal tracking-widest text-3xl">
                High Score
            </p>
            <p class="text-white text-4xl">
                {$highScore}
            </p>
        </left>
    {:else}
        <left class="bg-black w-2/3 h-full flex flex-col justify-center items-center">
            <p class="text-white font-normal tracking-widest text-3xl">
                Are you ready?
            </p>
            <br>
                {#if timerRunning}
                    <p class="text-white text-4xl">
                        {timer}
                    </p>
                {:else}
                    <button class="button rounded-lg py-2 px-4 text-black hover:text-white text-lg" on:click={startGame}>
                        Start
                    </button>
                {/if}
        </left>
    {/if}
    <right class="rounded-xl w-1/3 h-full game-right p-2 flex flex-col">
        <button class="button close-pop p-1 rounded-xl border-black" on:click={stopGame}>
            [X]
        </button>
        <div class="flex flex-col justify-start items-center w-full h-full pt-8 text-center text-base">
            <p>
                {instructions}
            </p>
            <br>
                {#key gameTimerRunning}
                    <Timer {gameTimerRunning}/>
                {/key}
            {#if gameIsActive}
                <input bind:value={reply} disabled={timerRunning} class="mb-1 w-1/2 text-center">
                <div class="flex">
                    {#if $gameIsActive}
                        <button {disabled} class="{!disabled ? "button" : ""} close-pop p-1 rounded-xl border-black m-1" on:click={submitHandler}>
                            Submit
                        </button>
                    {/if}
                </div>
            {/if}
        </div>
    </right>
</div>

<style>
    .game-right {
        background-color: rgba(255,222,3,.8);
    }

    .button {
        font-family: 'mainfont';
        background-color: rgba(255,222,3,.8);
        transition-duration: 400ms;
    }

    .button:hover {
        background-color: #ff5f03;
    }
</style>