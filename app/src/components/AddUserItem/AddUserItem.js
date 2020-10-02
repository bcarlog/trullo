import React, { useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import styles from './styles.module.scss'

import Button from '../Button/Button'
import { useOutsideDetect } from '../../utils/Listeners'
import UserItem from '../UserItem/UserItem'

const UserList = props => {
    const userStyles = [styles.user]

    if (props.isSelected) {
        userStyles.push(styles.selected)
    }
    if (props.isLoading) {
        return <Skeleton height={40} style={{ width: '100%', borderRadius: 12 }} />
    }

    return (
        <div className={userStyles.join(' ')} onClick={props.onClick}>
            <UserItem photo={props.photo} />
            <span>{props.username}</span>
        </div>
    )
}

const AddUserItem = props => {
    const [show, setShow] = useState(false)
    const [username, setUsername] = useState()
    const [selected, setSelected] = useState(null)
    const ref = useRef(null)

    const resetData = () => {
        if (show) {
            setUsername(null)
            setSelected(null)
            setShow(false)
        }
    }

    useOutsideDetect(ref, resetData)

    const showPop = () => {
        props.onSearch("")
        setShow(state => !state)
    }

    const saveNewUser = () => {
        props.onUpdateBoard({ newUserId: selected })
        setShow(false)
    }

    return (
        <div className={styles.userItem} ref={ref}>
            <Button icon="add" onClick={showPop} />

            {show ?
                <section className={styles.pop}>
                    <h3 className={styles.title}>Invite to Board</h3>
                    <div className={styles.description}>Search users you want to invite to</div>
                    <div className={styles.search}>
                        <input className={styles.input} placeholder="User..." onChange={(event) => { setUsername(event.target.value) }} />
                        <Button icon="search" onClick={() => { setSelected(null); props.onSearch(username); }} />
                    </div>
                    <div className={styles.users}>
                        {props.users.map(user => (
                            <UserList
                                key={`NewUser-${user.id}`}
                                id={user.id}
                                photo={user.photo}
                                username={user.username}
                                isSelected={user.id === selected}
                                onClick={() => setSelected(user.id)} />
                        ))}
                        {!props.isLoading && props.users.length === 0 ?
                            <h4>No more users</h4> : null}
                        {props.isLoading ?
                            <>
                                <UserList isLoading />
                                <UserList isLoading />
                                <UserList isLoading />
                            </>
                            : null
                        }
                    </div>
                    <div className={styles.button}>
                        <Button text="Invite" onClick={saveNewUser} disabled={selected === null} />
                    </div>
                </section>
                : null
            }
        </div>
    )
}

export default AddUserItem