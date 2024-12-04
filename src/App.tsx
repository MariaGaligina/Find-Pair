import {useEffect, useRef, useState} from 'react'
import styles from './App.module.scss'
import {useAppDispatch, useAppSelector} from './hooks/redux'
import {cardSlice} from './store/reducers/CardSlice'
import {fetchCards} from './store/reducers/ActionCreators'
import Game from './components/Game/Game'
import {Select, ISelectProps} from './components/Select/Select'
import Mode from './components/Mode/Mode'
import Modal from './components/Modal/Modal'
import Timer from './components/Timer/Timer'
import Stopwatch from './components/Stopwatch/Stopwatch'
import createResult, {IResult} from './functions/createResult'

let roundResult: IResult = {title: '', timeDescription: '', time: '', result: ''}

function App() {
	const {roundCards, isRoundNow, countOfFoundPairs, countOfPairsInRound} = useAppSelector(
		(state) => state.cardReducer
	)
	const {initRound, endRound} = cardSlice.actions
	const dispatch = useAppDispatch()

	const [countOfPairs, setCountOfPairs] = useState<string>('4')
	const [timeType, setTimeType] = useState<string>('Секундомер')
	const [modeSettingsIsOpen, setModeSettingsIsOpen] = useState<boolean>(true)
	const [modeSettingsIsVisible, setModeSettingsIsVisible] = useState<boolean>(true)

	const [modeResultIsOpen, setModeResultIsOpen] = useState<boolean>(false)
	const [modeResultIsVisible, setModeResultIsVisible] = useState<boolean>(false)

	const [isStopwatchRunning, setIsStopwatchRunning] = useState<boolean>(false)
	const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)
	const [isTimeControlVisible, setIsTimeControlVisible] = useState<boolean>(false)
	const [userTime, setUserTime] = useState<string>('01:10')
	const [timerTime, setTimerTime] = useState<string>('01:30')
	const [timeIsUp, setTimeIsUp] = useState<boolean>(false)

	const roundNumber = useRef<number>(1)

	const countOfCardsInRoundMode: ISelectProps = {
		arrayOptions: ['2', '3', '4', '5', '6', '7', '8'],
		title: 'Количество карточек:',
		option: countOfPairs,
		setOption: setCountOfPairs,
	}
	const timeControlMode: ISelectProps = {
		arrayOptions: ['Без времени', 'Секундомер', 'Таймер'],
		title: 'Учёт времени:',
		option: timeType,
		setOption: setTimeType,
	}
	const timerTimeMode: ISelectProps = {
		arrayOptions: ['00:05', '00:15', '00:30', '01:00', '01:30', '02:00'],
		title: 'Таймер',
		option: timerTime,
		setOption: setTimerTime,
	}

	const arrayForMode: Array<ISelectProps> =
		timeType === 'Таймер'
			? [countOfCardsInRoundMode, timeControlMode, timerTimeMode]
			: [countOfCardsInRoundMode, timeControlMode]

	const finishRound = () => {
		roundResult = createResult({
			timeType,
			countOfPairsInRound,
			countOfFoundPairs,
			userTime,
			timerTime,
			timeIsUp,
		})

		setTimeout(() => {
			dispatch(endRound())
			roundNumber.current += 1
			setModeResultIsVisible(true)
			setModeResultIsOpen(true)
			//это время анимации блока Game выигрыш или проигрыш
		}, 2000)
		setTimeout(() => {
			setIsTimeControlVisible(false)
		}, 3000)
		setTimeout(() => {
			setModeResultIsOpen(false)
			setModeSettingsIsVisible(true)
			setModeSettingsIsOpen(true)
		}, 6000)
		setTimeout(() => {
			setModeResultIsVisible(false)
		}, 8000)
	}

	useEffect(() => {
		;(async () => {
			await dispatch(fetchCards())
		})()
	}, [])

	useEffect(() => {
		if (!modeSettingsIsOpen && roundCards.length === 0) {
			setTimeout(() => {
				dispatch(initRound(Number(countOfPairs)))
			}, 2000)
			setTimeout(() => {
				setModeSettingsIsVisible(false)
				setIsTimeControlVisible(true)
				if (timeType === 'Секундомер') {
					setIsStopwatchRunning(true)
				} else if (timeType === 'Таймер') {
					setTimeIsUp(false)
					setIsTimerRunning(true)
				}
			}, 3000)
		}
	}, [modeSettingsIsOpen])

	useEffect(() => {
		if (isRoundNow) {
			console.log('isRoundNow true', isRoundNow)
		} else {
			console.log('isRoundNow false', isRoundNow)
		}
	}, [isRoundNow])

	useEffect(() => {
		if (
			countOfFoundPairs !== 0 &&
			countOfPairsInRound !== 0 &&
			countOfFoundPairs === countOfPairsInRound
		) {
			console.log('Все пары найдены!!!')
			if (timeType === 'Секундомер') {
				setIsStopwatchRunning(false)
			} else if (timeType === 'Таймер') {
				setIsTimerRunning(false)
			}
			console.log('finishRound() countOfFoundPairs')

			finishRound()
		}
	}, [countOfFoundPairs])

	useEffect(() => {
		console.log('effect по таймеру timeType', timeType)
		console.log(countOfPairsInRound, countOfFoundPairs, timeIsUp)

		if (countOfPairsInRound !== 0 && timeIsUp === true) {
			if (timeType === 'Секундомер') {
				setIsStopwatchRunning(false)
			} else if (timeType === 'Таймер') {
				console.log('finishRound() timeIsUp timer')
				console.log('таймер закончился')
				finishRound()
				setIsTimerRunning(false)
			}
		}
	}, [timeIsUp])

	return (
		<div className={styles.wrapper}>
			{timeType === 'Секундомер' && isTimeControlVisible ? (
				<Stopwatch
					isRunning={isStopwatchRunning}
					setIsRunning={setIsStopwatchRunning}
					setUserTime={setUserTime}
					title='Текущее время'></Stopwatch>
			) : (
				''
			)}
			{timeType === 'Таймер' && isTimeControlVisible ? (
				<Timer
					timerTime={timerTime}
					isRunning={isTimerRunning}
					setIsRunning={setIsTimerRunning}
					setUserTime={setUserTime}
					timeIsUp={timeIsUp}
					setTimeIsUp={setTimeIsUp}
					title='Оставшееся время'></Timer>
			) : (
				''
			)}

			{/*!modeSettingsIsVisible || !modeResultIsVisible ? (
				<h1>{`Раунд ${roundNumber.current}`}</h1>
			) : (
				``
			)*/}
			<Game countOfPairsInGame={countOfPairsInRound}></Game>
			{modeSettingsIsVisible ? (
				<Modal isOpen={modeSettingsIsOpen} setIsOpen={setModeSettingsIsOpen} result=''>
					{
						<>
							<h2>{`Параметры раунда ${roundNumber.current}`}</h2>
							<Mode gameOptionsArray={arrayForMode} />
						</>
					}
				</Modal>
			) : (
				''
			)}
			{modeResultIsVisible ? (
				<Modal
					isOpen={modeResultIsOpen}
					setIsOpen={setModeResultIsOpen}
					result={roundResult.result}>
					<h2>{roundResult.title}</h2>
					<h3>
						{roundResult.timeDescription} {roundResult.time}
					</h3>
				</Modal>
			) : (
				''
			)}
		</div>
	)
}

export default App
