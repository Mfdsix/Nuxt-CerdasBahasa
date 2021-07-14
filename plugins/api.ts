import RandomText from '~/api/randomText'
import Sentiment from '~/api/sentiment'
import LangDetector from '~/api/langDetector'

export default (context: any, inject: any) => {
    class Axios {
        async get(url: string, config: any = null){
            return await context.$axios.$get(url, config)
            .catch(this.error)
        }
        
        async post(url: string, data: any){
            return await context.$axios.$post(url, data)
            .catch(this.error)
        }

        error(_: any){
            alert("Request Failed")
            return false
        }
    }

    // Initialize API factories
    const factories = {
        randomText: RandomText(new Axios),
        sentiment: Sentiment(new Axios),
        langDetector: LangDetector(new Axios, context.env.detectLanguageApiKey),
    }
    
    // Inject $api
    inject("api", factories)
};