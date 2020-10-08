import { useEffect, useState } from "react"
import { getOwnBoards, getPublicBoards } from '../../services/BoardServices'

export const useBoards = ({ isAuthenticated }) => {
    const [ownBoards, setOwnBoards] = useState([])
    const [loadingOwn, setLoadingOwn] = useState(true)
    const [publicBoards, setPublicBoards] = useState([])
    const [loadingPublic, setLoadingPublic] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (isAuthenticated) {
            setOwnBoards([])
            setLoadingOwn(true)
            getOwnBoards().then(data => {
                setOwnBoards(data)
                setLoadingOwn(false)
            })
        }
        setPublicBoards([])
        getPublicBoards(isAuthenticated).then(data => {
            setPublicBoards(data)
            setLoadingPublic(false)
            if(!isAuthenticated){
                setLoadingOwn(false)
                setLoading(false)
            }
        })
        setLoading(true)
    }, [isAuthenticated])

    useEffect(() => {
        if (isAuthenticated && !loadingOwn && !loadingPublic) {
            setPublicBoards(publicBoards => publicBoards.filter(pBoard => !ownBoards.find(oBoard => oBoard.id === pBoard.id)))
            setLoading(false)
        }
    }, [loadingOwn, loadingPublic, isAuthenticated, ownBoards])


    return { loading, ownBoards, publicBoards }
}