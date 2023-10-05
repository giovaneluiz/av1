const username = encodeURIComponent("newton");
const password = encodeURIComponent("JuCbfbJuPwNcCNpA");

export const config = {
    mongoCon: `mongodb+srv://${username}:${password}@cluster0.nmfip.mongodb.net/?retryWrites=true&w=majority`
}