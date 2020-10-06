import { useState } from "react"
import { getUsers } from '../../services/UserServices'

export const useUsers = ({ boardId }) => {
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [users, setUsers] = useState([])

    const loadUsers = (username) => {
        setLoadingUsers(true)
        setUsers([])
        getUsers({ username, boardId })
            .then(data => {
                setUsers(data)
            })
            .finally(() => {
                setLoadingUsers(false)
            })
    }

    return { users, loadingUsers, loadUsers }
}