import {FC, useState, useEffect, useRef} from 'react'
import styles from './StopWatch.module.scss'

interface IStopwatch {
	isRunning: boolean
	setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
	setUserTime: React.Dispatch<React.SetStateAction<string>>
	title?: string
}

const Stopwatch: FC<IStopwatch> = ({isRunning, setIsRunning, setUserTime, title}) => {
	const [elapsedTime, setElapsedTime] = useState<number>(0) // Прошедшее время
	//const [isRunning, setIsRunning] = useState<boolean>(false) // оставить вместо управления извне (пропсами), для управления таймером только по его кнопкам
	const startAtRef = useRef<number | null>(null) // Используем useRef для хранения времени старта

	useEffect(() => {})

	// Эффект для обновления времени
	useEffect(() => {
		let timerInterval: NodeJS.Timeout

		if (isRunning) {
			if (startAtRef.current === null) {
				startAtRef.current = Date.now() - elapsedTime // Устанавливаем время начала
			}

			timerInterval = setInterval(() => {
				setElapsedTime(Date.now() - (startAtRef.current ?? Date.now())) // Обновляем прошедшее время
			}, 1000)
		} else {
			console.log('elapsed time', elapsedTime)
			setUserTime(formatTime(elapsedTime))
			resetTimer()
		}

		return () => {
			clearInterval(timerInterval) // Очищаем интервал при размонтировании
		}
	}, [isRunning]) // Убираем startAt из зависимостей

	// Функция для старта/остановки таймера (для самой игры не нужна)
	const toggleTimer = () => {
		setIsRunning((prev) => !prev)
		if (!isRunning) {
			startAtRef.current = null // Сбрасываем startAt при запуске
		}
	}

	// Функция для сброса таймера
	const resetTimer = () => {
		setIsRunning(false)
		setElapsedTime(0)
		startAtRef.current = null // Сбрасываем значение времени начала
	}

	// Форматирование времени в "минуты:секунды"
	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60000)
		const seconds = Math.floor((time % 60000) / 1000)
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
	}

	return (
		<div className={styles.stopwatch}>
			{typeof title === undefined ? '' : <p className={styles.title}>{title}</p>}
			<div className={styles.clock}>
				<p className={styles.time}>{formatTime(elapsedTime)}</p>
			</div>
		</div>
	)
}

export default Stopwatch
