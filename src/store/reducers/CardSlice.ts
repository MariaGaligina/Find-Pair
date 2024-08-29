import {ICard} from './../../models/ICard'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import createRoundCards from '../../functions/createRoundCards'

interface CardState {
	cards: ICard[]
	roundCards: ICard[]
	isRoundNow: boolean
	isLoading: boolean
	error: string
	currentPair: currentPairParams[]
	countOfPairsInRound: number
	countOfFoundPairs: number
	isVisible: boolean[]
	isShaken: boolean[]
}

export interface currentPairParams {
	id: number
	imgSrc: string
}

const initialState: CardState = {
	cards: [],
	roundCards: [],
	isRoundNow: false,
	isLoading: false,
	error: '',
	currentPair: [],
	countOfPairsInRound: 0,
	countOfFoundPairs: 0,
	isVisible: [],
	isShaken: [],
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
		initRound(state, action: PayloadAction<number>) {
			state.roundCards = createRoundCards(state.cards, action.payload)
			console.log('init round from init round')
			state.isRoundNow = true
			state.isVisible = new Array(action.payload * 2).fill(true)
			state.isShaken = new Array(action.payload * 2).fill(false)
			state.countOfPairsInRound = action.payload

			console.log('timeout')
			console.log('state.roundCards', state.roundCards)
			console.log('state.isRoundNow', state.isRoundNow)
			console.log('state.isVisible', state.isVisible)
			console.log('state.isShaken', state.isShaken)
			console.log('state.countOfPairsInRound', state.countOfPairsInRound)
		},
		endRound(state) {
			state.roundCards = []
			state.isRoundNow = false
			state.isVisible = []
			state.isShaken = []
			state.countOfPairsInRound = 0
			state.countOfFoundPairs = 0
		},
		initRoundCards(state) {
			state.roundCards = createRoundCards(state.cards, 4)
			console.log('init roundCards')
		},
		addCardToCheckPair(state, action: PayloadAction<currentPairParams>) {
			console.log('action payload')
			state.currentPair.push(action.payload)
			console.log('current pair', state.currentPair)
		},
		deleteCardsToCheckPair(state) {
			state.currentPair = []
			console.log('deleted pair []', state.currentPair)
		},
		deleteCardsFromRound(state) {
			state.roundCards = []
		},
		checkPair(state) {
			if (state.currentPair[0].imgSrc === state.currentPair[1].imgSrc) {
				if (state.currentPair[0].id === state.currentPair[1].id) {
					console.log('this is the same card!!!!!!!')
				} else {
					console.log('cards are pair !!!!!!')
					state.countOfFoundPairs += 1
				}
			} else {
				console.log('cards not pair !!!!!!')
			}
			console.log(JSON.stringify(state.currentPair[0]))
			console.log(JSON.stringify(state.currentPair[1]))
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
