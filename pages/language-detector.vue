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

                <hr>
                <div class="text-center mt-4" v-if="detections.length > 0">
                    <h3 class="mb-2">Result</h3>
                    <div class="bg-green-500 w-auto m-auto text-white p-10">
                      <p class="text-4xl font-bold">{{ detections[0].lang }}</p>
                      <i>confidence: {{ detections[0].confidence }}</i>
                    </div>
                    
                    <div class="overflow-hidden bg-white rounded w-full border mt-4 text-left">
                      <div class="block group hover:bg-blue p-4 border-b" v-for="(language, i) in detections" :key="i" v-if="i > 0">
                        <p v-if="!language.isReliable" class="font-bold text-lg mb-1 text-red-500">Not Reliable</p>
                        <p v-else class="font-bold text-lg mb-1 text-green-500">Reliable</p>
                        <p class="text-grey-darker mb-2">{{ language.lang }}</p>
                      </div>
                    </div>
                  </div>

            </div>
        </div>
    </div>
</template>

<script>
    import LANG from '@/utils/lang'
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
                },
                detections: []
            }
        },
        methods: {
            async generateText(){
                this.detections = [];
                this.toggleState(false);
                const generate = await this.$api.randomText.randomLang();
                if(generate.success){
                    this.model.text = generate.data?.text;
                }
                this.toggleState(true);
            },
            async detectText(){
                this.detections = [];
                this.toggleState(false);
                const detect = await this.$api.langDetector.detect(this.model.text);
                if(detect?.data){
                    const detections = detect.data?.detections;
                    detections.forEach((v) => {
                        v.lang = LANG[v.language];
                        this.detections.push(v);
                    });
                }
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