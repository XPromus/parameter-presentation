<script lang="ts">
    import Icon from '@iconify/svelte';

    let { children } = $props();
</script>

<div class="flex flex-col w-screen h-screen">
    <div class="flex flex-row w-full">
        <a href="/" class="items-center px-5 py-1 text-center duration-200 bg-gray-400 rounded-md hover:cursor-pointer hover:bg-gray-600 hover:text-white">
            <Icon icon="material-symbols:home-rounded" width="24" height="24" />
        </a>
    </div>
    {@render children?.()}
</div>
