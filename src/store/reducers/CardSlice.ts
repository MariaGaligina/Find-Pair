import {ICard} from './../../models/ICard'
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import createRoundCards from '../../functions/createRoundCards'
import togglePropertyInCardsPair from '../../functions/togglePropertyInCardsPair'
import togglePropertyInAllCards from '../../functions/togglePropertyInAllCards'

interface CardState {
	cards: ICard[]
	roundCards: ICard[]
	isRoundNow: boolean
	isLoading: boolean
	error: string
	currentPair: currentPairParams[]
	countOfPairsInRound: number
	countOfFoundPairs: number
	pairType: 'isNotPair' | 'isPair' | 'theSameCard' | 'notUsed'
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
	pairType: 'notUsed',
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
			state.isRoundNow = true
			state.countOfPairsInRound = action.payload
		},
		checkIsRoundFinished(state, action: PayloadAction<number>) {
			if (state.countOfFoundPairs === action.payload) {
				console.log('РАУНД ЗАВЕРШАЕТСЯ, все найдено')
			}
		},
		endRound(state) {
			state.isRoundNow = false
			state.countOfPairsInRound = 0
			state.countOfFoundPairs = 0
			state.roundCards = []
		},
		addCardToCheckPair(state, action: PayloadAction<currentPairParams>) {
			state.currentPair.push(action.payload)
			let cloneCurrentPair: currentPairParams[] = JSON.parse(JSON.stringify(state.currentPair))

			if (cloneCurrentPair.length === 2 && cloneCurrentPair[0].id === cloneCurrentPair[1].id) {
				return
			} else {
				state.roundCards = togglePropertyInCardsPair(
					state.roundCards,
					[action.payload],
					'isSelected'
				)
			}
		},
		deleteCardsToCheckPair(state) {
			const notFoundRoundCards: currentPairParams[] = JSON.parse(
				JSON.stringify(state.roundCards)
			).filter((item: any) => {
				if (item.isFound !== true) {
					return {id: item.id, imgSrc: item.imgSrc}
				}
			})
			//исключить кликабельность и невидимость найденных карт
			state.roundCards = togglePropertyInCardsPair(
				state.roundCards,
				notFoundRoundCards,
				'isClickable'
			)
			state.roundCards = togglePropertyInAllCards(state.roundCards, 'isShaken', false)
			state.roundCards = togglePropertyInAllCards(state.roundCards, 'isSelected', false)

			state.currentPair = []
		},
		checkPair(state) {
			state.roundCards = togglePropertyInAllCards(state.roundCards, 'isClickable', false)

			if (state.currentPair[0].imgSrc !== state.currentPair[1].imgSrc) {
				state.pairType = 'isNotPair'
			} else {
				if (state.currentPair[0].id === state.currentPair[1].id) {
					state.pairType = 'theSameCard'
				} else {
					state.pairType = 'isPair'
				}
			}
		},
		changeValuesOfPropertyInPairOfCards(state) {
			state.roundCards = togglePropertyInCardsPair(
				state.roundCards,
				state.currentPair,
				'isSelected'
			)

			switch (state.pairType) {
				case 'isNotPair':
					state.roundCards = togglePropertyInCardsPair(
						state.roundCards,
						state.currentPair,
						'isShaken'
					)
					break
				case 'theSameCard':
					state.roundCards = togglePropertyInCardsPair(
						state.roundCards,
						state.currentPair,
						'isShaken'
					)

					console.log(state.roundCards)
					break
				case 'isPair':
					state.roundCards = togglePropertyInCardsPair(
						state.roundCards,
						state.currentPair,
						'isFound'
					)
					state.countOfFoundPairs += 1
					console.log('state.countOfFoundPairs', state.countOfFoundPairs)

					break
				case 'notUsed':
					break
			}
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
