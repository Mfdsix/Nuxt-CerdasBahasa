export default (axios: any) => ({
    get(){
        return axios.get("/api/random")
    }
})