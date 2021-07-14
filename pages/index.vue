<template>
    <div>
        <div class="container max-w-lg m-auto my-20">
            <h3 class="text-4xl">Choose one you love</h3>
            <p>but relax, you can still choose all features next time</p>
            <div class="grid grid-cols-2 gap-2">
                <Card
                :title="'Sentiment Check'"
                :description="'check sentiment level from submitted sentences'"
                :to="'/sentiment'"
                />
                <Card
                :title="'Language Detector'"
                :description="'detect language of some sentences given precisely'"
                :to="'/language-detector'"
                />
            </div>
        </div>
    </div>
</template>

<script>

    import Card from '@/components/card.vue'
    
    export default{
        name: 'Index',
        components: {
            Card
        }
    }
</script>