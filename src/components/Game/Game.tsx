import {FC, useRef} from 'react'
import {useAppSelector, useAppDispatch} from '../../hooks/redux'
import cn from 'classnames'
import Cards from '../Cards/Cards'
import {cardSlice, currentPairParams} from '../../store/reducers/CardSlice'
import checkPairAsync from '../../store/reducers/CheckPair'
import styles from './Game.module.scss'

interface IGameProps {
	countOfPairsInGame: number
}

const Game: FC<IGameProps> = ({countOfPairsInGame}) => {
	const dispatch = useAppDispatch()
	const {roundCards, countOfFoundPairs, currentPair} = useAppSelector((state) => state.cardReducer)
	const {addCardToCheckPair} = cardSlice.actions

	const countOfClicks = useRef<number>(0)

	const clickCard = (id: number, imgSrc: string, isClickable: boolean) => {
		if (!isClickable) {
			return
		}

		countOfClicks.current += 1
		if (countOfClicks.current === 1) {
			dispatch(addCardToCheckPair({id, imgSrc}))
		} else if (countOfClicks.current === 2) {
			const cloneCurrentPair: currentPairParams[] = JSON.parse(JSON.stringify(currentPair))
			if (cloneCurrentPair[0].id === id && cloneCurrentPair[0].imgSrc === imgSrc) {
				countOfClicks.current -= 1
				return
			}
			;(async () => {
				await dispatch(addCardToCheckPair({id, imgSrc}))

				await dispatch(checkPairAsync())

				countOfClicks.current = 0
			})()
		} else if (countOfClicks.current > 2) {
			return
		}
	}

	const appearanceBlock = cn([styles.game], {
		[styles.appearance]: countOfPairsInGame !== countOfFoundPairs,
		[styles.disappearance]: countOfPairsInGame === countOfFoundPairs,
	})

	const dynamicStyle = {gridTemplateColumns: `repeat(${countOfPairsInGame}, 1fr)`}

	return (
		<div className={appearanceBlock} style={dynamicStyle}>
			<Cards cards={roundCards} onCardClick={clickCard} />
		</div>
	)
}

export default Game
