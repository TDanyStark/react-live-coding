import {API_KEY, API_URL} from './settings'

const fromApiResponseToGifs = apiResponde => {
    const {data} = apiResponde
    const {images, title, id} = data
    const {url} = images.downsized_medium
    return {title, id, url}

}

export default function getSingleGif ({id}) {
    const apiURL = `${API_URL}/gifs/${id}?api_key=${API_KEY}`
    
    return fetch(apiURL)
        .then(res => res.json())
        .then(fromApiResponseToGifs)
}