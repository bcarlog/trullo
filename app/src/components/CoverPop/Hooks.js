import { useEffect, useState } from "react"
import { getImages } from '../../services/ImageServices'

export const useImages = ({query="random"}) => {
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])

    useEffect(()=>{
        setLoading(true)
        getImages({query})
            .then(res => setImages(res))
            .finally(()=>setLoading(false))
    },[query])

    return {loading, images}
}