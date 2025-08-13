<script lang="ts">
    let {
        multiple = false,
        files = $bindable(),
        fileInputValue = $bindable(),
        disabled = $bindable(),
        accept,
    }: {
        multiple?: boolean,
        files: FileList | undefined,
        fileInputValue: string,
        disabled: boolean,
        accept: string
    } = $props();
</script>

<input 
    bind:value={fileInputValue}
    bind:files={files} 
    class="px-2 py-1 text-base text-white bg-gray-800 rounded-md grow placeholder:text-gray-500 outline-1 -outline-offset-1 outline-gray-600 focus:outline-2 focus:outline-white/50" 
    type="file" 
    name="" 
    id="" 
    multiple={multiple}
    disabled={disabled} 
    accept={accept}
>
