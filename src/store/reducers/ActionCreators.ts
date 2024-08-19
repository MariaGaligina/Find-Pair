import axios from 'axios'
import {AppDispatch} from '../store'
import {ICard} from '../../models/ICard'
import {cardSlice} from './CardSlice'

export const fetchCards = () => async (dispatch: AppDispatch) => {
	try {
		//?этот url скорее всего заменить, закинуть json с картинками на github и использовать уже его

		dispatch(cardSlice.actions.cardsFetching())
		const response = await axios.get<ICard[]>('http://localhost:3000/cards')
		let cardsFromJSON: ICard[] = response.data.map((card) => {
			return {...card, id: Number(card.id)}
		})
		console.log(response.data)
		dispatch(cardSlice.actions.cardsFetchingSuccess(cardsFromJSON))
		console.log(cardsFromJSON)
	} catch (e: any) {
		dispatch(cardSlice.actions.cardsFetchingError(e.message))
	}
}
