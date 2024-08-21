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
		dispatch(fetchCards())
		const fetchAndInitCards = async () => {
			await dispatch(fetchCards())
			dispatch(initRoundCards())
		}

		fetchAndInitCards()
	}, [])
	console.log(cards)

	return (
		<>
			<h2>Cards from json</h2>
			<div>{JSON.stringify(cards)}</div>
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
			{
				<Modal isOpen={modeIsOpen} setIsOpen={setModeIsOpen}>
					{<Mode gameOptionsArray={arrayForMode} />}
				</Modal>
			}
			<Cards cards={roundCards} onCardClick={() => console.log('clicked round card')}></Cards>

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
