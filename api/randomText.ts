export default (axios: any) => ({
    random(){
        return axios.get("/api/random")
    },
    randomLang(){
        return axios.get("https://santuke.herokuapp.com/rand")
    }
})