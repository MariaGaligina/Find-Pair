import {FC} from 'react'
import {ICard} from '../../models/ICard'

const Card: FC<ICard> = ({imgSrc}) => {
	return (
		<div>
			<img src={imgSrc} alt='not found'></img>
		</div>
	)
}

export default Card
