import React, { useEffect, useRef, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'

import { logoutUser } from '../../store/actions/user'
import Button from '../../components/Button/Button'
import ProfileOption from './components/ProfileOption'
import { useOutsideDetect } from '../../utils/Listeners'

const Header = ({ title }) => {
    const { loginWithRedirect, logout } = useAuth0();
    const { name, token, photo, expiration, isAuthenticated } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [showProfileOptions, setShowProfileOptions] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        if (expiration && expiration <= new Date().getTime()) {
            dispatch(logoutUser())
        }
    }, [dispatch, expiration])

    const closeProfileOptions = () => {
        if (showProfileOptions) {
            setShowProfileOptions(false)
        }
    }

    useOutsideDetect(ref, closeProfileOptions)

    const logoutHandler = () => {
        logout({ returnTo: window.location.origin })
        dispatch(logoutUser())
    }

    return (
        <div className={styles.header}>
            <NavLink
                to="/"
                style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <div className={styles.logoBox}>
                    <img src="/img/logo.png" alt="Trullo logo" className={styles.logo} />
                    <div className={styles.title}>Trullo</div>
                </div>
            </NavLink>
            <div className={styles.messageBox}>
                {title ?
                    <>
                        <div className={styles.name}>{title}</div>
                        <NavLink
                            to="/"
                            style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <div className={styles.boardsButton}>
                                <i className="material-icons md-16">apps</i>
                                <span>All Boards</span>
                            </div>
                        </NavLink>
                    </>
                    : null}
            </div>
            {/* <div className={styles.searchBox}>
                <input className={styles.search} placeholder="Keyword..." />
                <div className={styles.button}>Search</div>
            </div> */}
            {isAuthenticated ?
                <div className={styles.profileContainer} ref={ref}>
                    <div className={styles.profileBox} onClick={() => setShowProfileOptions(s => !s)}>
                        <img src={photo ?? "/img/logo.png"} alt={name + "-User"} className={styles.photo} />
                        <div className={styles.name}>{token ? name : 'Anonimo'}</div>
                        <div className={styles.button}><i className="material-icons md-18">arrow_drop_down</i></div>
                    </div>
                    {showProfileOptions ?
                        <div className={styles.profileOptions}>
                            <ProfileOption color="red" icon="exit_to_app" text="Logout" onClick={logoutHandler} />
                        </div>
                        : null}
                </div>
                :
                <Button text="Login" onClick={loginWithRedirect} />
            }
        </div>
    )
}

export default Header