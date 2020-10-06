import { useEffect, useState } from "react"
import { getOwnBoards, getPublicBoards } from '../../services/BoardServices'

export const useBoards = ({isAuthenticated}) => {
    const [ownBoards, setOwnBoards] = useState([])
    const [loadingOwn, setLoadingOwn] = useState(true)
    const [publicBoards, setPublicBoards] = useState([])
    const [loadingPublic, setLoadingPublic] = useState(true)

    useEffect(()=>{
        if(isAuthenticated){
            getOwnBoards().then(data => {
                setOwnBoards(data)
                setLoadingOwn(false)
            })
            getPublicBoards().then(data => {
                setPublicBoards(data)
                setLoadingPublic(false)
            })
        }
    },[isAuthenticated])

    return {loading: loadingOwn && loadingPublic, ownBoards, publicBoards}
}