export default (axios: any) => ({
    analyze(data: any) {
        return axios.post("https://sentim-api.herokuapp.com/api/v1/", data)
    }
})