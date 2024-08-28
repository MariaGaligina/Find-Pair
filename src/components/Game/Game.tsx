import {FC, useState, useEffect, useRef} from 'react'
import {useAppSelector, useAppDispatch} from '../../hooks/redux'
import Cards from '../Cards/Cards'
import {css} from '@emotion/css'
import {cardSlice} from '../../store/reducers/CardSlice'

interface IGameProps {}
interface ICardRef {
	id: number
	imgSrc: string
}

const Game: FC<IGameProps> = () => {
	const dispatch = useAppDispatch()
	const {cards, roundCards, currentPair, countOfFoundPairs, countOfPairsInRound} = useAppSelector(
		(state) => state.cardReducer
	)
	const {addCardToCheckPair, checkPair, deleteCardsToCheckPair} = cardSlice.actions

	const [clickedCardId, setClickedCardId] = useState<number | null>(null)
	const countOfClicks = useRef<number>(0)
	//const countOfFoundPairs = useRef<number>(0)
	const childRef = useRef<HTMLDivElement | null>(null)
	const firstClickedCard = useRef<ICardRef | null>(null)
	const secondClickedCard = useRef<ICardRef | null>(null)
	const [isVisible, setIsVisible] = useState<boolean[]>(new Array(cards.length).fill(true))
	const [isShaken, setIsShaken] = useState<boolean[]>(new Array(cards.length).fill(false))
	//dispatch(cardSlice.actions.initRoundCards())

	//useEffect(() => {}, [])

	console.log('new render')

	console.log('current pair game', currentPair)
	console.log('isVisible', isVisible)
	console.log('count of found pairs', countOfFoundPairs)

	useEffect(() => {
		if (roundCards.length > 0) {
			setIsVisible(new Array(roundCards.length).fill(true))
			console.log('isVisible', isVisible)
			let arr = roundCards.map((item) => {
				return item.id
			})
			console.log('all round ids', arr)
		}
		//console.log('useEffect roundCards changed')
		//console.log('[roundCards] roundCards', roundCards)
	}, [roundCards])

	useEffect(() => {}, [countOfClicks])

	useEffect(() => {
		console.log('all round pairs', countOfPairsInRound)
		if (countOfPairsInRound !== 0 && countOfFoundPairs !== 0) {
			if (countOfPairsInRound === countOfFoundPairs) {
				console.log('round === found', countOfPairsInRound, countOfFoundPairs)
			} else {
				console.log('round !== found', countOfPairsInRound, countOfFoundPairs)
			}
		}
	}, [countOfPairsInRound, countOfFoundPairs])

	const clickCard = (id: number, imgSrc: string) => {
		countOfClicks.current += 1
		if (countOfClicks.current === 1) {
			dispatch(addCardToCheckPair({id, imgSrc}))
			console.log('current pair 1', currentPair)
		} else if (countOfClicks.current === 2) {
			;(async () => {
				await dispatch(addCardToCheckPair({id, imgSrc}))
				console.log('call check pair')

				await dispatch(checkPair())

				console.log('count of pairs', countOfFoundPairs)
				if (countOfFoundPairs === 0) {
					console.log('ne tak')
				} else {
					console.log('count of pairs more 0')
				}
				await dispatch(deleteCardsToCheckPair())
				//countOfClicks.current = 0
				console.log('КЛИКИ С 0', countOfClicks.current)
			})()

			//dispatch(addCardToCheckPair({id, imgSrc}))
			//dispatch(checkPair())

			//console.log('count of pairs', countOfFoundPairs)
			/*if (countOfFoundPairs === 0) {
				console.log('ne tak')
			} else {
				console.log('count of pairs more 0')
			}
			setTimeout(() => {
				dispatch(deleteCardsToCheckPair())
			}, 2000)
			//dispatch(deleteCardsToCheckPair())*/

			/*;(async () => {
				await dispatch(addCardToCheckPair({id, imgSrc}))
				console.log('check pair')
				dispatch(checkPair())
			})()*/
			console.log('current pair 2', currentPair)
		}
	}

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

			if (firstClickedCard.current?.imgSrc === secondClickedCard.current.imgSrc) {
				console.log('cards are the same')
				console.log('ids', firstClickedCard.current?.id, secondClickedCard.current?.id)
				/**/
				setIsVisible((prevState) => {
					console.log('ids', firstClickedCard.current?.id, secondClickedCard.current?.id)
					if (firstClickedCard.current?.id && secondClickedCard.current?.id) {
						console.log(
							'оба айди есть',
							firstClickedCard.current?.id,
							secondClickedCard.current?.id
						)
						let newVisibility = [...prevState]
						console.log('prev in setVisibility', newVisibility)

						for (let i = 0; i < newVisibility.length; i++) {
							if (
								roundCards[i].id === firstClickedCard.current.id ||
								roundCards[i].id === secondClickedCard.current.id
							) {
								newVisibility[i] = !newVisibility[i]
							}
						}

						//newVisibility=newVisibility.map((item)=>)
						//newVisibility[firstClickedCard.current.id] = !newVisibility[firstClickedCard.current.id]
						//newVisibility[secondClickedCard.current.id] = !newVisibility[secondClickedCard.current.id]
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
		console.log('cards: ', cards.length, 'roundCards: ', roundCards.length, isVisible)

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
			<Cards cards={roundCards} onCardClick={clickCard} />
			{/*<Cards cards={cards} onCardClick={handleCardClick} />*/}
			<p>{JSON.stringify(isVisible)}</p>
		</div>
	)
}

export default Game
