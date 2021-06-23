# FlipMoji😜

Flip moji is a simple speed and luck-based mini-game webapp.

![UX Image](https://github.com/MikeBrandon/flip-moji/blob/main/public/images/ux.PNG)

## Description

The user has to find out which emoji appears odd number of times and pick any of its numbers. The time remaining when he gets the right answer are awarded to him/her as points and are multiplied by the number of cards not flipped for a bonus multiplier.

## Dependencies

* Svelte 3.0.0
* Tailwind CSS
* Typescript

## Data

### Fonts

* Main font used was [Doland](https://www.dafont.com/doland.font).
* Font used for the flipMoji logo was [Stereofidelic](https://www.dafont.com/stereofidelic.font).

### Progress

- [x] Setup Environment
- [x] Design webapp
- [x] Add Game logic
- [ ] Add leaderboard system
- [ ] Add animations and transitions
- [ ] Fix bugs
- [ ] Host webapp

### Experience

Library | Experience
--------|-----------
Svelte | Felt easy to learn and enjoyed using it over React
TailwindCSS | Was easy to use but had to keep reffering to class names before getting used to the class names
Typescript | Very similar to Javascript so easy to get a hang of

## Components

### Stores

```javascript
import { writable } from "svelte/store";

export const isPlaying = writable(0);
export const showingHighScore = writable(0);
export const score = writable(0);
export const highScore = writable(0);
export const cardsOpen = writable(0);
export const timeRem = writable(0);
export const gameIsActive = writable(0);
```

Store | Type
------|------
isPlaying | boolean
showingHighScore | boolean
score | Integer
highScore | Integer
cardsOpen | Integer
timeRem | Integer
gameIsActive | boolean

All the stores are writable stores used by different components in the web app.

* __*isPlaying*__ - becomes true when he player clicks Play on the landing page and activates the Main component for the game and turns false when the user closes the Main component thus returning the user to the landing page.

* __*showingHighScore*__ - becomes true after the user submits a card number to show the player score and high score and becomes false every time a new game is started.

* __*score*__ - stores the score of the player for each round and is reset every time a game is started.

* __*highScore*__ - stores the high score of the player for each round and is reset every time the score store becomes greater than it.

* __*cardsOpen*__ - stores the number of cards that have not been fliped by the user and the value is decremented by 1 every time the player flips a card and is reset every time a game starts.

* __*timeRem*__ - is the time remaining for a round to end and is reset everytime a new game starts.

* __*gameIsActive*__ - stores the state of the game. It becomes true when the user starts a round and becomes false when the round ends.

### Navbar

The Navbar background turns to #ffde03 color and text to black from #ffde03 when the user scrolls past 100 pixels. It achieves this by receiving a value as a prop from App.svelte.

A variable y is bound to the scrollY attribute for the window.
```svelte
<svelte:window bind:scrollY={y}/>
```

The boolean showNavbar is set to true when y becomes greater than 100 (user scrolls 100 pixels) otherwise is false and updates everytime the value of y changes.
```javascript
$: showNavbar = y>100;
```

A change in the value of showNavbar triggers the value of the props passed to the Navbar to become its components classes.
```javascript
$: navclass = showNavbar ? "nav-container": "";
$: textClass = showNavbar ? "textwhite": "";

<Navbar showNav={navclass} textClass={textClass}/>
```

The props showNav and textClass are passed to the elements as class names that are already styled.
```svelte
<div class="{showNav} p-3 text-black flex fixed w-full transition-all">
<p class="{textClass} text-5xl ml-4 logo">flipMoji</p>
</div>
```
__CSS:__
```css
.nav-container {
        background-color: #ffde03;
        transition-duration: 400ms;
}

.textwhite {
        color: black;
        transition-duration: 400ms;
}
```

### Banner

The banner holds the Homepage entry state and shifts to the Main Component when the user clicks on the Play Button. It checks for the state value of isPlaying boolean to determine which component to show.
 
```svelte
{#key $isPlaying}
        {#if $isPlaying}
            <Main/>
        {:else}
            <Playnow/>
        {/if}
{/key}
```

### Main

This component holds all the functionality for the game in all its states.

It has an array of all the names of the emoji files to be used by the game.
```javascript
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
```

Two other arrays are initialized. picked stores the emojis to be used in a round of the game and cards stores the emoji and id for each card for a single round of the game.

```javascript
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
```

onMount function for the Main is the `pickRandomEmojis()` and the score store is reset to 0 function below which it performs the first time it is rendered. 
* The function picks a random emoji from the emoji array and places them in each slot in the picked array.
* A random one is picked as the correct answer.
* The value of cardsOpen store is reset here.
* For each emoji picked to be used, they are placed twice randomly in the cards array except for the answer emoji which is placed only once therefore ensuring the answer is always odd. This is done in the `setUpCards()` function.
* The `setUpCards()` generates a random number between 0 to 9 in a while loop until it generates the index of an arrayobject with an empty name after which it places the name passed from the picked object from `pickRandomEmojis()` function and placed in the empty name.
* Eventually it performs a check for the answer which was passed from `pickRandomEmojis()` as a 0 for not answer and 1 for answer. If it was the answer, its name will be saved in the finalAns variable.
```javascript
function pickRandomEmojis() {
    //Picks emojis to use
    for (let i = 0; i < picked.length; i++) {
        let item = emojis[Math.floor(Math.random() * emojis.length)];
        picked[i].name = item.name;
    }

    //Picks answer
    ans = Math.floor(Math.random() * 5);

    //resets cardsOpen value to 10
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
```

The Main object is divided into the `<left>` and `<right>` parts. The left part holds most of the gameplay while the right side holds the input for the user, time and game instructions.

A number of variables are checked to determine what components are rendered in the `<left>` Component. They include:
* __*gameIsActive*__ (store)
* __*timerRunning*__
* __*showingHighScore*__ (store)

If gameIsActive is true and timerRunning is false, the cards are rendered and the game runs.
A card is rendered for each object in the cards array where each card is passed to the `<Card>` component.
```svelte
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
```

If the above conditions are not met but the showingHighScore store is true, then the user highscore is rendered.
This displays the value of the score store which is updated at the end of the round that just ended and the highScore store too.
```svelte
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
```

If all the above conditions are not met then the are you ready page is rendered which happens right before the game runs.
This screen has a start button and timer which starts running when the button is clicked.
```svelte
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
```

The start button runs the `startGame()` function when clicked. This function sets the gameIsActive store to True and timerRunning boolean to true which switched the button with a timer which counts down 3 seconds after which it switches timerRunning to false and gameTimerRunning to true. This is also where the timeRem store is reset to 60 for the game Round timer. This makes the game render after the timeOut completes.
```javascript
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
```

The right side of the main component has less states and therefore is simpler.
```svelte
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
```

The X button runs the `stopGame()` function which changes the isPlaying state to false which renders the landing page and removes the main element.
```javascript
function stopGame() {
    isPlaying.set(false);
}
```

gameTimerRunning variable is passed to the Timer component which runs the game timer.

### Timer

onMount for Timer runs a function which runs a timer for 60 seconds and sets showingHiscore store to true which shows the high score pannel when time is up.
```javascript
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
```

### Card

The id of the card Prop passed in is used to render the number for the user to pick to choose his answer beside the emoji.
```svelte
<p class="text-white text-base mr-1">
    {emoji.id + 1}
</p>
```

Every card is initialized with a viewed variable set to false by default.
A check is also performed to confirm if the user has clicked on the card. When the user clicks on the card, a `handleClick()` function is performed which changes the value of viewed to true.
```javascript
function handleClick() {
    if (!viewed) {
            cardsOpen.update(n => n-1);
        }
    viewed = true;
}
```

When viewed is false, the skull emoji is rendered to show the user that the card is face down and being changed to true makes it reveal the emoji that was passed to the card.
```svelte
{#if viewed}
    <button class="h-5/6 w-4/6 bg-white border-black border-solid hover:bg-gray-300 focus:bg-red-400 border-2 rounded-lg flex justify-center items-center cursor-pointer">
        <img src="../images/emojis/{emoji.name}.png" alt="card-1" class="max-w-full max-h-full p-2 shadow-xl">
    </button>
{:else}
    <button on:click={handleClick} class="h-5/6 w-4/6 bg-white border-black border-solid hover:bg-gray-300 focus:bg-yellow-400 border-2 rounded-lg flex justify-center items-center cursor-pointer">
        <img src="../images/emojis/106-skull.png" alt="card-1" class="max-w-full max-h-full p-2 shadow-xl">
    </button>
{/if}
```

### Playnow

This is the landing page component that welcomes users to the webapp. When the playNow button is clicked, it sets the isPlaying store to true which activates the Main component which manages the whole game.
```javascript
function runGame() {
    isPlaying.set(true);
}
```

## Version History

* 0.1
    * Initial Release