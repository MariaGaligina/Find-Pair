import {ICard} from '../models/ICard'
import deleteRandomElements from './deleteRandomElements'
import shuffleElementsInArray from './shuffleElementsInArray'

const createRoundCards = (cards: ICard[], countOfPairs: number): ICard[] => {
	let roundCards: ICard[] = deleteRandomElements(cards, countOfPairs)

	roundCards = [...roundCards, ...roundCards]
	roundCards = shuffleElementsInArray(roundCards)

	return roundCards
}

export default createRoundCards
