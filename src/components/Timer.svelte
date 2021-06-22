<script>
    import { onMount } from "svelte";
    import { showingHighScore, gameIsActive, timeRem } from "../stores/stores";

    export let gameTimerRunning;

    onMount(() => {
        if (gameTimerRunning) {
            var timerIntervalID = setInterval(() => {
                timeRem.update(n => n-1);
            }, 1000);

            setTimeout(() => {
                clearInterval(timerIntervalID);
                setTimeout(() => {
                    $timeRem = 0;
                    showingHighScore.set(true);
                }, 1000)
            },1000 * 60);
        }
    })
</script>

<p class="text-4xl">
    {#if $timeRem == 0}
        Time's Up
    {:else}
        Time
    {/if}
</p>
<p class="text-8xl">
    {#if $gameIsActive}
        {$timeRem}
    {:else}
        0
    {/if}
</p>