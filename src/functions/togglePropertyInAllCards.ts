import {ICard} from './../models/ICard'

export interface ITogglePropertyInAllCards {
	cardsArray: ICard[]
	changedProperty: keyof ICard
	propertyValue: ICard[keyof ICard]
}

const togglePropertyInAllCards = (
	cardsArray: ICard[],
	changedProperty: keyof ICard,
	propertyValue: ICard[keyof ICard]
) => {
	let clonedCards: ICard[] = JSON.parse(JSON.stringify(cardsArray))

	clonedCards = clonedCards.map((item) => {
		if (item[changedProperty] !== propertyValue) return {...item, [changedProperty]: propertyValue}
		else return item
	})

	return clonedCards
}

export default togglePropertyInAllCards
