import {FC} from 'react'
import {ICard} from '../../models/ICard'
import Card from '../Card/Card'

interface ICardsProps {
	cards: ICard[]
}

const Cards: React.FC<ICardsProps> = ({cards}) => {
	return (
		<>
			{cards.map((card, index) => (
				<Card key={index} imgSrc={card.imgSrc} id={card.id} isSelected={card.isSelected} />
			))}
		</>
	)
}

export default Cards
