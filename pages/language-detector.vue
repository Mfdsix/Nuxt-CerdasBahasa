<template>
    <div>
        <div class="w-full max-w-md m-auto mt-10">
            <Back/>
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Type text to detect
                    </label>
                    <textarea v-model="model.text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="10" type="text" placeholder="Type text to detect"></textarea>
                </div>
                <div class="flex items-center justify-between mb-4">
                    <button v-if="!loading.generate" @click="generateText" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Generate
                    </button>
                    <button v-else class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        loading ...
                    </button>
                    <button v-if="!loading.detect" @click="detectText" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Detect Language
                    </button>
                    <button v-else class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        loading ...
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'LanguageDetector',
        data(){
            return{
                model: {
                    text: null
                },
                loading: {
                    generate: false,
                    detect: false
                }
            }
        },
        methods: {
            async generateText(){
                this.toggleState(false);
                const generate = await this.$api.randomText.randomLang();
                if(generate.success){
                    this.model.text = generate.data?.text;
                }
                this.toggleState(true);
            },
            async detectText(){
                this.toggleState(false);
                const detect = await this.$api.langDetector.detect(this.model.text);
                console.log(detect);
                this.toggleState(true);
            },
            toggleState(enable = true){
                if(enable){
                    this.loading.generate = false;
                    this.loading.detect = false;
                }else{
                    this.loading.generate = true;
                    this.loading.detect = true;
                }
            }
        }
    }
</script>