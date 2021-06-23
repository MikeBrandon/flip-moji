# FlipMoji

Flip moji is a simple speed and luck-based mini-game webapp.

## Description

The user has to find out which emoji appears odd number of times and pick any of its numbers. The time remaining when he gets the right answer are awarded to him/her as points and are multiplied by the number of cards not flipped for a bonus multiplier.

## Dependencies

* Svelte 3.0.0
* Tailwind CSS
* Typescript

## Style

### Fonts

* Main font used was [Doland](https://www.dafont.com/doland.font).
* Font used for the flipMoji logo was [Stereofidelic](https://www.dafont.com/stereofidelic.font).

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

```
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
```
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

```
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

## Version History

* 0.1
    * Initial Release