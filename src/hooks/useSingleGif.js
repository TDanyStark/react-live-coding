// import getSingleGif from 'services/getSingleGif'
import {useGifs} from './useGifs'
// import {useEffect, useState} from 'react'

export function useSingleGif ({ id }) {


    const {gifs} = useGifs()
    if (gifs.length === 0 || !gifs) return false
    const gif = gifs.find(singleGif =>
        singleGif.id === id
    )

    
    // const [gif, setGif] = useState(gifFromCache)

    // useEffect(function () {
    //     if (!gif) {
    //         getSingleGif({id}).then(gif => setGif(gif))
    //     }
    // }, [gif, id])




    return {gif}
}