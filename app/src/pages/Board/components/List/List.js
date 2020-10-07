import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styles from './styles.module.scss'

import { getCardsFromList } from '../../../../store/selectors'
import { addCardServer } from '../../../../store/actions/board'
import AddButton from '../../../../components/AddButton/AddButton'
import Card from '../Card/Card'
import CardNew from '../CardNew/CardNew'
import CardSaving from '../Card/CardSaving'
import Options from '../../../../components/Options/Options'

const List = ({ id, index, title, boardId, editable, cards, isDragDisabled, addCardServer }) => {
    const [isAddingCard, setIsAddingCard] = useState(false)
    const [newCardTitle, setNewCardTitle] = useState(null)
    const [showOptions, setShowOptions] = useState(false)

    const saveCardHandler = (text) => {
        if (text) {
            setNewCardTitle(text)
            addCardServer({ title: text, boardId, listId: id, cb: () => setNewCardTitle(null) })
        }
        setIsAddingCard(false)
    }

    let addCardComponent = null
    if (isAddingCard) {
        addCardComponent = <CardNew onBlur={saveCardHandler} onSave={saveCardHandler} />
    } else if (editable) {
        addCardComponent = <AddButton title="Add another card" onClick={() => setIsAddingCard(true)} />
    }

    const cardsOrdered = cards.sort((c1, c2) => c1.order - c2.order)

    return (
        <Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
            {(provided, snapshot) => (
                <div
                    className={styles.list}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div className={styles.head} {...provided.dragHandleProps} >
                        <h2 className={styles.title}>{title}</h2>
                        <div style={{position:'relative'}}>
                            <div className={styles.options} onClick={() => setShowOptions(s => !s)}>
                                <i className="material-icons md-16">more_horiz</i>
                            </div>
                            {showOptions ?
                                <Options />
                                : null}
                        </div>
                    </div>
                    <Droppable droppableId={id} type="card" isDropDisabled={!editable || newCardTitle !== null}>
                        {(provided) => (
                            <div
                                className={styles.cardsContainer}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {cardsOrdered.map((card, index) => (
                                    <Card
                                        key={card.id}
                                        isDragDisabled={newCardTitle !== null}
                                        id={card.id}
                                        index={index}
                                        title={card.title}
                                        coverSmall={card.coverSmall}
                                        coverMedium={card.coverMedium}
                                        description={card.description}
                                        labels={card.labels}
                                        editable={editable}
                                    />
                                ))}
                                {provided.placeholder}
                                {newCardTitle ? <CardSaving title={newCardTitle} /> : null}
                                {snapshot.isDragging ? null : addCardComponent}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    )
}

const mapStateToProps = (state, ownProps) => ({
    cards: getCardsFromList(state, ownProps.id)
})

export default connect(mapStateToProps, { addCardServer })(List)