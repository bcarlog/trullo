import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { NavLink } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import styles from './styles.module.scss'

import UserItem from '../../../../components/UserItem/UserItem'

const BoardItem = ({ isLoading, url, title, cover, team, owner }) => {

    if (isLoading) {
        return <Skeleton height={320} width={300} style={{ borderRadius: 20 }} />
    }

    let exceededUsers = 0
    if (team.length > 4) {
        team = team.slice(0, 3)
        exceededUsers = team.length - 3
    }

    return (
        <NavLink
            to={url}
            exact
            style={{
                textDecoration: 'none',
                color: 'inherit'
            }}>
            <div className={styles.boardItem} >
                <img src={cover ?? "/img/default.jpg"} alt={"Imagen " + title} className={styles.photo} />
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.users}>
                    <UserItem key={uuid()} photo={owner.photo} />
                    {team.map(user => (
                        <UserItem key={uuid()} photo={user.photo} />
                    ))}
                    {exceededUsers > 0 ?
                        <div>+ {exceededUsers} others</div>
                        : null
                    }
                </div>
            </div>
        </NavLink>
    )
}

export default BoardItem