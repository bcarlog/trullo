import React from 'react'
import { v4 as uuid } from 'uuid'
import styles from './styles.module.scss'

import BoardItem from '../BoardItem/BoardItem'

const PublicBoards = ({ isLoading, boards }) => {
    if (isLoading) {
        return <></>
    }

    return (
        <div className={styles.main}>
            <div className={styles.head}>
                <h3>Public Boards</h3>
            </div>
            <div className={styles.boardList}>
                {!isLoading && boards.map(board => (
                    <BoardItem
                        key={uuid()}
                        cover={board.cover}
                        title={board.title}
                        team={board.teamFull}
                        owner={board.ownerFull}
                        url={`/board/${board.id}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default PublicBoards