import {ICard} from './../../models/ICard'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import createRoundCards from '../../functions/createRoundCards'
import deleteRound from '../../functions/deleteRound'
import {produce} from 'immer'

interface CardState {
	cards: ICard[]
	roundCards: ICard[]
	isRoundNow: boolean
	isLoading: boolean
	error: string
}

const initialState: CardState = {
	cards: [],
	roundCards: [],
	isRoundNow: false,
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
		initRoundCards(state) {
			state.roundCards = createRoundCards(state.cards, 4)
		},
		deleteCardsFromRound(state) {
			state.roundCards = []
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
