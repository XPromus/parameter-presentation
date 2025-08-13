<script lang="ts" generics="T">
    let {
        value = $bindable(),
        placeholder,
        onChange,
        type,
    }: {
        value: T,
        placeholder: string,
        onChange?: any,
        type: string
    } = $props();
</script>

<input 
    bind:value={value} 
    onchange={onChange} 
    type={type} 
    placeholder={placeholder}
    class="px-2 py-1 text-base text-white bg-gray-800 rounded-md grow placeholder:text-gray-500 outline-1 -outline-offset-1 outline-gray-600 focus:outline-2 focus:outline-white/50"
>
