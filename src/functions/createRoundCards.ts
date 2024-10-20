import {ICard} from '../models/ICard'
import deleteRandomElements from './deleteRandomElements'
import shuffleElementsInArray from './shuffleElementsInArray'

const createRoundCards = (cards: ICard[], countOfPairs: number): ICard[] => {
	let roundCards: ICard[] = deleteRandomElements(cards, countOfPairs)
	const allCardsCount: number = cards.length

	roundCards = [
		...roundCards.map((card) => ({
			...card,
			isClickable: true,
			isFound: false,
			isSelected: false,
			isShaken: false,
			isVisible: false,
		})),
		...roundCards.map((card) => {
			return {
				...card,
				id: card.id + allCardsCount,
				isClickable: true,
				isFound: false,
				isSelected: false,
				isShaken: false,
				isVisible: false,
			}
		}),
	]

	roundCards = shuffleElementsInArray(roundCards)

	return roundCards
}

export default createRoundCards
