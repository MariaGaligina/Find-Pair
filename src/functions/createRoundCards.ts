import {ICard} from '../models/ICard'
import deleteRandomElements from './deleteRandomElements'
import shuffleElementsInArray from './shuffleElementsInArray'

const createRoundCards = (cards: ICard[], countOfPairs: number): ICard[] => {
	let roundCards: ICard[] = deleteRandomElements(cards, countOfPairs)
	const allCardsCount: number = cards.length

	roundCards = [
		...roundCards.map((card) => ({...card})),
		...roundCards.map((card) => {
			return {...card, id: card.id + allCardsCount}
		}),
	]

	roundCards = shuffleElementsInArray(roundCards)

	return roundCards
}

export default createRoundCards
