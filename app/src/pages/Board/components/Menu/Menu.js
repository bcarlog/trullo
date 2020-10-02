import React, { useState } from 'react'
import styles from './styles.module.scss'

import Visibility from '../../../../components/Visibility/Visibility'
import UserItem from '../../../../components/UserItem/UserItem'
import AddUserItem from '../../../../components/AddUserItem/AddUserItem'
import { getUsers } from '../../../../services/UserServices'

const Menu = ({ visibility, team, owner, boardId, amIOwner, onUpdateBoard }) => {
    const [newUsers, setNewUsers] = useState([])
    const [isLoadingUsers, setIsLoadingUsers] = useState(false)

    const searchUsersHandler = username => {
        setIsLoadingUsers(true)
        setNewUsers([])
        getUsers({ username, boardId })
            .then(data => {
                setNewUsers(data)
            })
            .finally(() => {
                setIsLoadingUsers(false)
            })
    }

    return (
        <div className={styles.menu}>
            <div className={styles.left}>
                <Visibility value={visibility} onChange={(visibility) => onUpdateBoard({ visibility })} />
                <div className={styles.members}>
                    {owner ?
                        <UserItem key={"key-Admin-" + owner.username} photo={owner.photo} />
                        : null
                    }
                    {team.map(user => (
                        <UserItem key={"key-" + user.username} photo={user.photo} />
                    ))}
                    {amIOwner ?
                        <AddUserItem
                            onUpdateBoard={onUpdateBoard}
                            users={newUsers}
                            onSearch={searchUsersHandler}
                            isLoading={isLoadingUsers} />
                        : null}
                </div>
            </div>
            <div className={styles.right}>

            </div>
        </div>
    )
}

export default Menu