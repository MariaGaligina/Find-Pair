import {FC} from 'react'
import {ICard} from '../../models/ICard'
import Card from '../Card/Card'

interface ICardsProps {
	cards: ICard[]
	onCardClick: (id: number, imgSrc: string, isClickable: boolean) => void
}

const Cards: FC<ICardsProps> = ({cards, onCardClick}) => {
	return (
		<>
			{cards.map((card) => (
				<Card
					key={card.id}
					imgSrc={card.imgSrc}
					id={card.id}
					isClickable={card.isClickable}
					onClick={onCardClick}
					isShaken={card.isShaken}
					isFound={card.isFound}
					isSelected={card.isSelected}
				/>
			))}
		</>
	)
}

export default Cards
