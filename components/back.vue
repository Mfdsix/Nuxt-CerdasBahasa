<template>
    <div>
        <div class="flex text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            <NuxtLink class="ml-3" :to="to">Back</NuxtLink>
        </div>
        <br/>
        <hr/>
        <br/>
    </div>
</template>

<script>
    export default{
        name: 'Back',
        props: {
            to: {
                type: String,
                default: () => "/"
            },
        },
    }
</script>