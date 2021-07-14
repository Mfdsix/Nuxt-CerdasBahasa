import RandomText from '~/api/randomText'
import Sentiment from '~/api/sentiment'

export default (context: any, inject: any) => {
    class Axios {
        async get(url: string){
            return await context.$axios.$get(url)
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
    };
    
    // Inject $api
    inject("api", factories);
};