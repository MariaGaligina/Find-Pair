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
		let pairIds: number[] | string[] = clonedPair.map((item) => item.id)
		let pairIdsSet = new Set(pairIds)

		if (pairIds.length !== pairIdsSet.size) {
			clonedArray = clonedArray.map((item) => {
				if (pairIdsSet.has(item.id)) {
					return {
						...item,
						[changedProperty]: !(item as {[key: string]: any})[changedProperty],
					}
				} else {
					return {...item}
				}
			})
		} else {
			clonedArray = clonedArray.map((item) => {
				if (pairIds.includes(item.id)) {
					return {
						...item,
						[changedProperty]: !(item as {[key: string]: any})[changedProperty],
					}
				} else {
					return {...item}
				}
			})
		}
		return clonedArray
	}
}

export default togglePropertyInCardsPair
