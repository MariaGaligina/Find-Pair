import {currentPairParams} from '../store/reducers/CardSlice'
import {ICard} from '../models/ICard'

const togglePropertyInCardsPair = (
	originalArray: ICard[],
	comparisonArray: currentPairParams[],
	changedProperty: string
) => {
	let clonedArray: ICard[] = JSON.parse(JSON.stringify(originalArray))
	let clonedPair: currentPairParams[] = JSON.parse(JSON.stringify(comparisonArray))
	if (!Object.keys(clonedArray[0]).includes(changedProperty)) {
		return
	} else {
		const comparisonIds = clonedPair.map((item) => item.id)

		clonedArray = clonedArray.map((item) => {
			if (comparisonIds.includes(item.id)) {
				console.log(
					changedProperty,
					(item as {[key: string]: any})[changedProperty],
					!(item as {[key: string]: any})[changedProperty]
				)
				return {
					...item,
					[changedProperty]: !(item as {[key: string]: any})[changedProperty],
				}
			} else {
				return {...item}
			}
		})
		return clonedArray
	}
}

export default togglePropertyInCardsPair
