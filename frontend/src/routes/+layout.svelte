<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="w-screen h-screen bg-slate-800 max-w-screen max-h-screen">
	{@render children?.()}
</div>
