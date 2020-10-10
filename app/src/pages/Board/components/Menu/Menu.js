import React from 'react'
import { connect } from 'react-redux'
import styles from './styles.module.scss'

import Visibility from '../../../../components/Visibility/Visibility'
import UserItem from '../../../../components/UserItem/UserItem'
import AddUserItem from '../../../../components/AddUserItem/AddUserItem'
import { getVisibility, getTeamFull, getOwner, getBoardId, getAmIOwner, getEditable, getLoadingBoard } from '../../../../store/selectors'
import { updateBoard } from '../../../../store/actions/board'
import { useUsers } from '../../hooks'
// import ButtonSecondary from '../../../../components/ButtonSecondary/ButtonSecondary'
// import BoardModal from '../BoardModal/BoardModal'

const Menu = ({ visibility, teamFull, owner, boardId, amIOwner, editable, loading, updateBoard }) => {
    const { users, loadingUsers, loadUsers } = useUsers({boardId})

    return (
        <div className={styles.menu}>
            <div className={styles.left}>
                {loading ? <div>Loading...</div> :
                    <>
                        <Visibility value={visibility} onChange={(visibility) => updateBoard({ visibility })} editable={editable && amIOwner} />
                        <div className={styles.members}>
                            <UserItem key={"key-Admin-" + owner.username} photo={owner.photo} />
                            {teamFull.map(user => (
                                <UserItem key={"key-" + user.username} photo={user.photo} />
                            ))}
                            {amIOwner ?
                                <AddUserItem
                                    onUpdateBoard={updateBoard}
                                    users={users}
                                    onSearch={loadUsers}
                                    isLoading={loadingUsers} />
                                : null}
                        </div>
                    </>}
            </div>
            <div className={styles.right}>
                {/* <ButtonSecondary icon="more_horiz" text="Show Menu"/>
                <BoardModal editable={amIOwner}/> */}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    visibility: getVisibility(state),
    teamFull: getTeamFull(state),
    owner: getOwner(state),
    boardId: getBoardId(state),
    amIOwner: getAmIOwner(state),
    editable: getEditable(state),
    loading: getLoadingBoard(state),
})

export default connect(mapStateToProps, {
    updateBoard
})(Menu)