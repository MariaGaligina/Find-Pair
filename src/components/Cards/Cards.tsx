import React, {FC} from 'react'
import {ICard} from '../../models/ICard'
import Card from '../Card/Card'

interface ICardsProps {
	cards: ICard[]
}

const Cards: FC<ICardsProps> = ({cards}) => {
	return (
		<div>
			{cards.map((card, index) => (
				<>
					<Card {...card} key={index} />
					<p>{`id ${card.id} sel ${card.isSelected}`}</p>
				</>
			))}
		</div>
	)
}

export default Cards
