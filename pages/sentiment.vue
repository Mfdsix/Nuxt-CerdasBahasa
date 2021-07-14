<template>
  <div>
    <div class="w-full max-w-md m-auto mt-10">
      <Back/>
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Type text to analyze
          </label>
          <textarea v-model="model.text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="10" type="text" placeholder="Type text to analyze"></textarea>
        </div>
        <div class="flex items-center justify-between mb-4">
          <button v-if="!loading.generate" @click="getText" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Generate Text
          </button>
          <button v-else disabled class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            loading ...
          </button>
          <button v-if="!loading.analyze" @click="analyzeText" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Analyze
          </button>
          <button v-else disabled class="disabled bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            loading ...
          </button>
        </div>
        <hr>
        <div class="text-center mt-4" v-if="result.type">
          <h3 class="mb-2">Result</h3>
          <div :class="result.bg + ' w-auto m-auto text-white p-10'">
            <p class="text-4xl font-bold">{{ result.score }}</p>
            <i>{{ result.type }}</i>
          </div>
          
          <div class="overflow-hidden bg-white rounded w-full border mt-4 text-left">
            <div class="block group hover:bg-blue p-4 border-b" v-for="(sentence, i) in result.sentences" :key="i">
              <p v-if="sentence.sentiment.type == 'negative'" class="font-bold text-lg mb-1 text-red-500">Negative</p>
              <p v-if="sentence.sentiment.type == 'neutral'" class="font-bold text-lg mb-1 text-yellow-500">Neutral</p>
              <p v-if="sentence.sentiment.type == 'positive'" class="font-bold text-lg mb-1 text-green-500">Positive</p>
              <p class="text-grey-darker mb-2">{{ sentence.sentence }}</p>
            </div>
          </div>
        </div>
      </div>
      <p class="text-center text-gray-500 text-xs">
        &copy;2021 CerdasBahasa. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
  import Back from '@/components/back.vue'

  const bgResult = {
    'negative': 'bg-red-500',
    'neutral': 'bg-yellow-500',
    'positive': 'bg-green-500'
  }
  
  export default {
    name: 'Sentiment',
    data(){
      return{ 
        model: {
          text: null,
        },
        loading: {
          generate: false,
          analyze: false,
        },
        result: {
          bg: null,
          type: null,
          score: 0,
          sentences: []
        }
      }
    },
    methods: {
      async getText(){
        this.loading.generate = true
        const text = await this.$api.randomText.get()
        this.loading.generate = false
        
        if(text){
          this.model.text = text[0]
        }
      },
      async analyzeText(){
        if(!this.model.text){
          alert("Please type text first")
          return
        }
        this.result= {
          type: null,
          score: 0,
          sentences: []
        }
        
        this.loading.generate = true
        this.loading.analyze = true
        
        const analyze = await this.$api.sentiment.analyze({
          text: this.model.text
        })
        this.loading.generate = false
        this.loading.analyze = false
        
        if(analyze){
          this.result = {
            bg: bgResult[analyze?.result?.type],
            type: analyze?.result?.type,
            score: analyze?.result?.polarity,
            sentences: analyze?.sentences
          }
        }
      }
    }
  }
</script>