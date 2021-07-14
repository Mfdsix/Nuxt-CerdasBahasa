export default (axios: any, apiKey: string) => ({
    detect(query: string) {
        return axios.get("https://ws.detectlanguage.com/0.2/detect", {
            params: {
                q: query,
            },
            headers: {
                Authorization: "Bearer " + apiKey
            }
        })
    }
})