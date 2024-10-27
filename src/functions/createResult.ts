interface ICreateResult {
	timeType: string
	countOfPairsInRound: number
	countOfFoundPairs: number
	userTime: string
	timerTime: string
	timeIsUp: boolean
}

export interface IResult {
	title: string
	timeDescription: string
	time: string
	result: string
}

const createResult = ({
	timeType,
	countOfPairsInRound,
	countOfFoundPairs,
	userTime,
	timerTime,
	timeIsUp,
}: ICreateResult): IResult => {
	let title,
		timeDescription,
		time,
		result = ''
	if (timeType === 'Без времени') {
		if (countOfPairsInRound === countOfFoundPairs) {
			title = 'Победа'
			timeDescription = 'Без учёта времени'
			time = ''
			result = 'win'
		} else {
			title = 'Не известно'
			timeDescription = `Раунд завершён досрочно`
			time = ''
		}
	} else if (timeType === 'Секундомер') {
		if (countOfPairsInRound === countOfFoundPairs) {
			title = 'Победа'
			timeDescription = `Ваше время:`
			result = 'win'
		} else {
			title = 'Не известно'
			timeDescription = `Раунд завершён досрочно`
		}
		time = userTime
	} else if (timeType === 'Таймер') {
		if (countOfPairsInRound === countOfFoundPairs && countOfFoundPairs !== 0) {
			title = 'Победа'
			timeDescription = `Ваше время:`
			time = userTime
			result = 'win'
		} else {
			if (timeIsUp) {
				title = 'Проигрыш'
				timeDescription = `Время истекло`
				time = userTime
				result = 'loss'
			} else {
				title = 'Не известно'
				timeDescription = `Раунд завершён досрочно`
				time = `${userTime}/${timerTime}`
			}
		}
	}
	return {
		title: title,
		timeDescription: timeDescription,
		time: time,
		result: result,
	}
}

export default createResult
