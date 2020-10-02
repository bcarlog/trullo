import React, { useState } from 'react'
import styles from './styles.module.scss'
import { v4 as uuid } from 'uuid';

import Button from '../../../../components/Button/Button'
import BoardItem from '../BoardItem/BoardItem'
import CreateModal from '../CreateModal/CreateModal'

const Main = props => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className={styles.main}>
            <div className={styles.head}>
                <h3>My Boards</h3>
                <Button onClick={()=>setShowModal(state => !state)} text="+ Add"/>
            </div>
            <div className={styles.boardList}>
                {!props.isLoading && props.boards.map(board => (
                    <BoardItem 
                        key={uuid()}
                        cover={board.cover}
                        title={board.title}
                        team={board.teamFull}
                        owner={board.ownerFull}
                        url={`/board/${board.id}`}
                    />
                ))}
                {props.isLoading ? (
                    <>
                    <BoardItem key={uuid()} isLoading={props.isLoading}/>
                    <BoardItem key={uuid()} isLoading={props.isLoading}/>
                    <BoardItem key={uuid()} isLoading={props.isLoading}/>
                    </>
                ): null}
            </div>
            <CreateModal show={showModal} onClose={setShowModal.bind(this, false)}/>
        </div>
    )
}

export default Main