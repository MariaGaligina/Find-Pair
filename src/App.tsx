import {useEffect, useState} from 'react'
import Input from './components/Input/Input'
import {Select, ISelectProps} from './components/Select/Select'
import Mode from './components/Mode/Mode'
import Modal from './components/Modal/Modal'

import './App.css'
import {useAppDispatch, useAppSelector} from './hooks/redux'
import {cardSlice} from './store/reducers/CardSlice'
import Cards from './components/Cards/Cards'
import {fetchCards} from './store/reducers/ActionCreators'
import Game from './components/Game/Game'

//import ModeInput from './components/ModeInput/ModeInput.tsx'

function App() {
	const {cards, roundCards} = useAppSelector((state) => state.cardReducer)
	const {addCard, initializeCardsArray, initRoundCards} = cardSlice.actions
	const dispatch = useAppDispatch()

	const [countOfPairs, setCountOfPairs] = useState<string>('4')
	const [timeType, setTimeType] = useState<string>('Секундомер')
	const [modeIsOpen, setModeIsOpen] = useState<boolean>(true)
	console.log('render App')

	const arrayForMode: Array<ISelectProps> = [
		{
			arrayOptions: ['3', '4', '5', '6', '7', '8'],
			title: 'Количество карточек:',
			option: countOfPairs,
			setOption: setCountOfPairs,
		},
		{
			arrayOptions: ['Без времени', 'Секундомер', 'Таймер'],
			title: 'Учёт времени:',
			option: timeType,
			setOption: setTimeType,
		},
	]
	useEffect(() => {
		const fetchAndInitCards = async () => {
			await dispatch(fetchCards())
			dispatch(initRoundCards())
		}

		fetchAndInitCards()
	}, [])

	return (
		<>
			<h2>Cards from GAME</h2>
			<Game></Game>
			<h2>Cards from round</h2>
			<button
				onClick={() => {
					dispatch(cardSlice.actions.initRoundCards())
				}}>
				round
			</button>
			<button
				onClick={() => {
					dispatch(cardSlice.actions.deleteCardsFromRound())
				}}>
				delete round
			</button>
			<Cards cards={roundCards} onCardClick={() => console.log('clicked round card')}></Cards>

			<button
				onClick={() =>
					dispatch(
						addCard({
							id: 1,
							imgSrc: 'imgsrc',
							isSelected: false,
						})
					)
				}>
				Add Card
			</button>
			<button onClick={() => dispatch(initializeCardsArray(cards))}>initial Cards</button>
			{/*
				<Modal isOpen={modeIsOpen} setIsOpen={setModeIsOpen}>
					{<Mode gameOptionsArray={arrayForMode} />}
				</Modal>
			*/}
			{/*<Cards cards={cards} />*/}

			{/*
			<Select
				arrayOptions={['3', '4', '5', '6', '7', '8']}
				title='Количество карточек:'
				option={num}
				setOption={setNum}/>*/}
		</>
	)
}

export default App
