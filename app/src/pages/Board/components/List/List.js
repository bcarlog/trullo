import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { createDispatchHook, createSelectorHook } from 'react-redux'
import styles from './styles.module.scss'

import { createCard, updateCardList } from '../../../../services/CardServices'
import { dragCard, dropCard } from '../../store/screenActions'
import { orderListWithNewCard, orderListFromOrder } from '../../utils/list'
import AddButton from '../../../../components/AddButton/AddButton'
import Card from '../Card/Card'
import CardNew from '../CardNew/CardNew'

const List = props => {
    const useDispatch = createDispatchHook(props.context)
    const useSelector = createSelectorHook(props.context)
    const { cardDrag, height } = useSelector(state => state);
    const dispatch = useDispatch()

    const [tmpCardPos, setTmpCardPos] = useState(-1)
    const [cards, setCards] = useState(props.cards)
    const [isAddingCard, setIsAddingCard] = useState(false)
    const listRef = useRef(null)

    useEffect(() => {
        setCards(props.cards)
    }, [props.cards])

    const saveCardHandler = (text) => {
        if (text) {
            const card = {
                title: text,
                description: null,
                boardId: props.boardId,
                listId: props.id
            }
            createCard(card)
                .then(data => {
                    setCards([...cards, data])
                })
        }
        setIsAddingCard(false)
    }

    const onDragEnter = (e) => {// Se ejecuta en list destino
        e.preventDefault()
        if (cardDrag && tmpCardPos === -1) {
            setTmpCardPos(1)
        }
    }

    const onDragLeave = (e) => {// Se ejecuta en list temporal
        if (!listRef.current.contains(e.relatedTarget)) {
            setTmpCardPos(-1)
        }
    }

    const onDropCard = () => {// Se ejecuta en list destino
        if (cardDrag) {
            let newPosCard = tmpCardPos === -1 ? 1 : tmpCardPos
            const newCards = [...cards, { ...cardDrag, order: newPosCard, listId: props.id }]
            let newCardsOrdered = orderListWithNewCard({ list: newCards, id: cardDrag.id, order: newPosCard })
            setCards(newCardsOrdered)

            updateCardList({ cardId: cardDrag.id, listId: props.id, order: newPosCard })
            dispatch(dropCard())
        }
        setTmpCardPos(-1)
    }

    const onDragCard = ({ id, height }) => { // Se ejecuta en list original
        if (!cardDrag) {
            const cardDragTmp = { ...cards.find(card => card.id === id) }
            dispatch(dragCard({ cardDrag: cardDragTmp, height }))
            setCards(cards => orderListFromOrder({ list: cards.filter(c => c.id !== cardDragTmp.id), order: cardDragTmp.order }))
        }
    }

    const onDragEnd = () => { // Se ejecuta en list original
        if (cardDrag) { // Si no puso el card en ninguna lista
            const newCards = [...cards, cardDrag]
            setCards(orderListWithNewCard({ list: newCards, id: cardDrag.id, order: cardDrag.order }))
            dispatch(dropCard())
        }
    }

    const cardsOrdered = cards.sort((c1, c2) => c1.order - c2.order)

    let cardComponents = cardsOrdered.map(card => (
        <Card
            key={card.id}
            id={card.id}
            title={card.title}
            coverSmall={card.coverSmall}
            coverMedium={card.coverMedium}
            description={card.description}
            labels={card.labels}
            hide={cardDrag && cardDrag.id === card.id}
            order={card.order}
            onChangeCardTmp={setTmpCardPos}
            onDrag={({ height }) => onDragCard({ id: card.id, height })}
            onDragEnd={onDragEnd}
        />
    ))

    if (cardDrag && cardDrag.listId === props.id) {
        cardComponents.push(
            <Card
                key={cardDrag.id}
                id={cardDrag.id}
                title={cardDrag.title}
                coverSmall={cardDrag.coverSmall}
                coverMedium={cardDrag.coverMedium}
                description={cardDrag.description}
                labels={cardDrag.labels}
                hide={true}
                order={cardDrag.order}
                onChangeCardTmp={setTmpCardPos}
                onDrag={({ height }) => onDragCard({ id: cardDrag.id, height })}
                onDragEnd={onDragEnd}
            />
        )
    }

    if (tmpCardPos > 0) {
        let pos = tmpCardPos - 1
        cardComponents.splice(pos, 0,
            <div
                key={'tmp' + tmpCardPos + props.id}
                style={{ height, width: '100%', border: '1px dashed var(--color-blue-dark)', backgroundColor: 'var(--color-blue-light)', marginBottom: 24, borderRadius: 12 }}>
                &nbsp;
            </div>
        )
    }

    return (
        <div className={styles.list} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDropCard} ref={listRef} onDragOver={e => e.preventDefault()}>
            <div className={styles.head}>
                <h2 className={styles.title}>{props.title}</h2>
                <div><i className="material-icons md-16">more_horiz</i></div>
            </div>
            <div className={styles.cardsContainer}>
                {cardComponents}
                {isAddingCard ?
                    <CardNew onBlur={saveCardHandler} onSave={saveCardHandler} />
                    :
                    <AddButton title="Add another card" onClick={() => setIsAddingCard(true)} />
                }

            </div>
        </div>
    )
}

const ListWrap = props => {
    if (props.isLoading) {
        return <Skeleton height={320} width={240} style={{ borderRadius: 20, }} />
    }
    return <List {...props} />
}

export default ListWrap