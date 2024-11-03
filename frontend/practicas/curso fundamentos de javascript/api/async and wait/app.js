// function fetchDAta(){
//     fetch("https://rickandmortyapi.com/api/character")
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error))
// }

async function fetchDAta(){
    // try -> lo que tiene que pasar
    // cath el error 
    try{
        let response = await fetch("https://rickandmortyapi.com/api/character")
        let data = await response.json();
        console.log(data)
    } catch(error){
        console.log(error)
    }
}

const urls = [   "https://rickandmortyapi.com/api/character",
    "https://rickandmortyapi.com/api/location",
    "https://rickandmortyapi.com/api/episode"
]

async function fetchNewDAta(){
    try{
        for await (let url of urls) {
            let response = await fetch(url);
            let data = await response.json();
            console.log(data)
        }
    }catch(error){
        console.log(error)
    }

}