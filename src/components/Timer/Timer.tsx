import {FC, useState, useEffect, useRef} from 'react'
import styles from './Timer.module.scss'
import cn from 'classnames'

interface ITimer {
	timerTime: string
	isRunning: boolean
	setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
	setUserTime: React.Dispatch<React.SetStateAction<string>>
	title?: string
	timeIsUp: boolean
	setTimeIsUp: React.Dispatch<React.SetStateAction<boolean>>
}

const timeToNumber = (timeFromUser: string): number => {
	let [minutes, seconds] = timeFromUser.split(':')
	return Number(minutes) * 60 + Number(seconds)
}
// Форматирование времени в "минуты:секунды"
const formatTime = (time: number) => {
	const minutes = Math.floor(time / 60000)
	const seconds = Math.floor((time % 60000) / 1000)
	return {
		elapsedTime: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
		minutes: minutes,
		seconds: seconds,
	}
}

const Timer: FC<ITimer> = ({
	timerTime,
	isRunning,
	setIsRunning,
	setUserTime,
	title,
	timeIsUp,
	setTimeIsUp,
}) => {
	const [elapsedTime, setElapsedTime] = useState<number>(timeToNumber(timerTime)) // Прошедшее время
	//const [isRunning, setIsRunning] = useState<boolean>(false) // Статус таймера
	const [duration, setDuration] = useState<number>(timeToNumber(timerTime)) // Длительность обратного таймера в секундах
	const startAtRef = useRef<number | null>(null) // Используем useRef для хранения времени старта
	const [isStartClockStyle, setIsStartClockStyle] = useState<boolean>(true)

	// Эффект для обновления времени
	useEffect(() => {
		clockStyles = cn([styles.clock], [styles['left-time']])
		setDuration(timeToNumber(timerTime))
		let timerInterval: NodeJS.Timeout

		if (isRunning) {
			if (startAtRef.current === null) {
				startAtRef.current = Date.now()
			}

			timerInterval = setInterval(() => {
				const remainingTime = duration * 1000 - (Date.now() - (startAtRef.current ?? Date.now()))
				if (remainingTime <= 0) {
					console.log('remainingTime <= 0')

					setUserTime(timerTime)
					clearInterval(timerInterval)
					setIsRunning(false)
					setElapsedTime(0)
					setTimeIsUp(true)
					startAtRef.current = null // Сбрасываем значение времени начала
				} else {
					setElapsedTime(remainingTime)
				}
			}, 1000)
		} else {
			setElapsedTime(timeToNumber(timerTime))
			if (timeIsUp) {
				setUserTime(timerTime)
			} else {
				setUserTime(formatTime(Date.now() - (startAtRef.current ?? Date.now())).elapsedTime)
			}
			resetTimer()
		}

		return () => {
			clearInterval(timerInterval)
		}
	}, [isRunning])

	useEffect(() => {
		setTimeout(() => {
			setIsStartClockStyle(false)
		}, 1000)
	}, [])

	// Функция для старта/остановки таймера
	const toggleTimer = () => {
		setIsRunning((prev) => !prev)
		if (!isRunning) {
			startAtRef.current = null // Сбрасываем startAt при запуске
		}
	}

	// Функция для сброса таймера
	const resetTimer = () => {
		setIsRunning(false)
		setElapsedTime(timeToNumber(timerTime))
		startAtRef.current = null // Сбрасываем значение времени начала
	}

	const elapsedRoundTime = formatTime(elapsedTime)

	let clockStyles = cn([styles.clock], [styles['left-time']], {
		[styles['little-left-time']]:
			isRunning &&
			!isStartClockStyle &&
			Number(elapsedRoundTime.minutes) === 0 &&
			Number(elapsedRoundTime.seconds) <= 10,

		[styles['start-clock-style']]: isStartClockStyle,
	})

	console.log(isRunning, timeIsUp)

	return (
		<div className={styles.timer}>
			{typeof title === undefined ? '' : <p className={styles.title}>{title}</p>}
			<div className={clockStyles}>
				<p className={styles.time}>{elapsedRoundTime.elapsedTime}</p>
			</div>
		</div>
	)
}

export default Timer
