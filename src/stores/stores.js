import { writable } from "svelte/store";

export const isPlaying = writable(0);
export const showingHighScore = writable(0);
export const score = writable(0);
export const highScore = writable(0);
export const cardsOpen = writable(0);
export const timeRem = writable(0);
export const gameIsActive = writable(0);