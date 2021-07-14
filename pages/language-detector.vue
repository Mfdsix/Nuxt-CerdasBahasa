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
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Detect Language
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
                }
            }
        }
    }
</script>