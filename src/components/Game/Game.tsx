import {FC, useState, useEffect, useRef} from 'react'
import {useAppSelector, useAppDispatch} from '../../hooks/redux'
import Cards from '../Cards/Cards'
import {css} from '@emotion/css'

interface IGameProps {}
interface ICardRef {
	id: number
	imgSrc: string
}

const Game: FC<IGameProps> = () => {
	const dispatch = useAppDispatch()
	const {cards, roundCards} = useAppSelector((state) => state.cardReducer)
	const [clickedCardId, setClickedCardId] = useState<number | null>(null)
	const countOfClicks = useRef<number>(0)
	const childRef = useRef<HTMLDivElement | null>(null)
	const firstClickedCard = useRef<ICardRef | null>(null)
	const secondClickedCard = useRef<ICardRef | null>(null)
	const [isVisible, setIsVisible] = useState<boolean[]>(new Array(cards.length).fill(true))
	const [isShaked, setIsShaked] = useState<boolean[]>(new Array(cards.length).fill(false))
	//dispatch(cardSlice.actions.initRoundCards())

	//useEffect(() => {}, [])

	useEffect(() => {
		if (roundCards.length > 0) {
			setIsVisible(new Array(roundCards.length).fill(true))
		}
		console.log('useEffect roundCards changed')
		console.log('[roundCards] roundCards', roundCards)
	}, [roundCards])

	useEffect(() => {}, [countOfClicks])

	const handleCardClick = (id: number, imgSrc: string) => {
		countOfClicks.current += 1

		if (countOfClicks.current === 1) {
			firstClickedCard.current = {id: id, imgSrc: imgSrc}
			console.log('first', firstClickedCard.current?.id)
			console.log('second', secondClickedCard.current?.id)
		} else if (countOfClicks.current === 2) {
			secondClickedCard.current = {id: id, imgSrc: imgSrc}
			console.log('first', firstClickedCard.current?.id)
			console.log('second', secondClickedCard.current?.id)

			if (JSON.stringify(firstClickedCard.current) === JSON.stringify(secondClickedCard.current)) {
				console.log('cards are the same')
				/**/
				setIsVisible((prevState) => {
					console.log('ids', firstClickedCard.current?.id, secondClickedCard.current?.id)
					if (firstClickedCard.current?.id && secondClickedCard.current?.id) {
						console.log(
							'оба айди есть',
							firstClickedCard.current?.id,
							secondClickedCard.current?.id
						)
						const newVisibility = [...prevState]
						console.log('prev in setVisibility', newVisibility)

						newVisibility[firstClickedCard.current.id] = !newVisibility[firstClickedCard.current.id]
						newVisibility[secondClickedCard.current.id] =
							!newVisibility[secondClickedCard.current.id]
						console.log('new state')
						console.log('prev in setVisibility', newVisibility)

						return newVisibility
					}
					console.log('prev State')
					return prevState // Если firstClickedCard.current или id не определены, возвращаем предыдущее состояние age
				})

				//countOfClicks.current = 0
			} else {
				console.log('cards are not the same')
			}
			console.log(countOfClicks.current)

			//countOfClicks.current = 0
			//firstClickedCard.current = null
			//secondClickedCard.current = null
		}
		//setClickedCardId(id)
		//console.log('current', childRef.current)
		console.log('cards: ', cards.length, isVisible)

		console.log(`Card with id ${id} was clicked`)
		console.log(countOfClicks.current)
	}

	return (
		<div
			className={css`
				display: grid;
				gap: 15px;
				background-color: aquamarine;
				grid-template-columns: repeat(8, 1fr);
			`}>
			<Cards cards={roundCards} onCardClick={handleCardClick} />
			{/*<Cards cards={cards} onCardClick={handleCardClick} />*/}
		</div>
	)
}

export default Game
