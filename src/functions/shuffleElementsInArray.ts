const shuffleElementsInArray = <T>(array: T[]): T[] => {
	let randomIndex: number
	let shuffled: T[] = [...array]

	for (let i = array.length - 1; i > 0; i--) {
		randomIndex = Math.floor(Math.random() * (i + 1))
		;[shuffled[randomIndex], shuffled[i]] = [shuffled[i], shuffled[randomIndex]]
	}

	return shuffled
}

export default shuffleElementsInArray
