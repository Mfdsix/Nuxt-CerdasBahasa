<template>
    <div class="py-4 px-8 bg-white shadow-lg rounded-lg my-20">
        <div>
            <h2 class="text-gray-800 text-2xl font-semibold">{{ title }}</h2>
            <p class="mt-2 text-gray-600">{{ description }}</p>
            <br>
            <hr>
            <br>
            <div class="text-right">
                <NuxtLink :to="to" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Try this
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'Card',
        props: [
            'title',
            'description',
            'to',
        ]
    }
</script>