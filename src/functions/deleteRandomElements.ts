const deleteRandomElements = <T>(array: T[], countOfElements: number): T[] => {
	if (countOfElements >= array.length) return array
	else {
		let randomIndex: number
		let arrayLength: number = array.length
		let newArray: T[] = [...array]

		for (let i = 0; i < arrayLength - countOfElements; i++) {
			randomIndex = Math.floor(Math.random() * newArray.length)
			newArray.splice(randomIndex, 1)
		}

		return newArray
	}
}

export default deleteRandomElements
