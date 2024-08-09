import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ICard} from '../../models/ICard'

interface CardState {
	cards: ICard[]
	isLoading: boolean
	error: string
}

const initialState: CardState = {
	cards: [],
	isLoading: false,
	error: '',
}

export const cardSlice = createSlice({
	name: 'card',
	initialState,
	reducers: {
		cardsFetching(state) {
			state.isLoading = true
		},
		cardsFetchingSuccess(state, action: PayloadAction<ICard[]>) {
			state.isLoading = false
			state.error = ''
			state.cards = action.payload
		},
		cardsFetchingError(state, action: PayloadAction<string>) {
			state.isLoading = false
			state.error = action.payload
		},
		addCard(state, action: PayloadAction<ICard>) {
			state.cards.push(action.payload)
		},
		initializeCardsArray(state, action: PayloadAction<ICard[]>) {
			state.cards = [...action.payload]
		},
	},
})

export default cardSlice.reducer
