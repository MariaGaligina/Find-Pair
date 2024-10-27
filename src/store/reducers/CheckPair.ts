import {AppDispatch} from '../store'
import {cardSlice} from './CardSlice'

export const checkPairAsync = () => async (dispatch: AppDispatch) => {
	const delay = 1000
	try {
		;(async () => {
			await dispatch(cardSlice.actions.checkPair())
			//в зависимости от типа пары :
			//таймаут позволяет завершиться анимации (selected card)
			await setTimeout(() => {
				dispatch(cardSlice.actions.changeValuesOfPropertyInPairOfCards())
			}, delay)
			await setTimeout(() => {
				dispatch(cardSlice.actions.deleteCardsToCheckPair())
			}, delay * 2)
		})()
	} catch (error) {}
}

export default checkPairAsync
