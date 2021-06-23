<script lang="ts">
	import Navbar from "./components/Navbar.svelte"
	import Banner from "./components/Banner.svelte";
	
	let y;
	$: showNavbar = y>100;
	$: navclass = showNavbar ? "nav-container": "";
	$: textClass = showNavbar ? "textwhite": "";
</script>

<svelte:window bind:scrollY={y}/>

<main class="">
	<Navbar showNav={navclass} textClass={textClass}/>
	<Banner/>
</main>

<style>

</style>