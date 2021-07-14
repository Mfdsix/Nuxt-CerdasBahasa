import ENV from '~/utils/env'

export default (axios: any) => ({
    detect(query: string) {
        return axios.get("https://ws.detectlanguage.com/0.2/detect", {
            params: {
                q: query,
            },
            headers: {
                Authorization: "Bearer " + ENV.DETECT_LANGUAGE_API_KEY
            }
        })
    }
})