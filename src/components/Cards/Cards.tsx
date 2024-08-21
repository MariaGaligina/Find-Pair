import {FC} from 'react'
import {ICard} from '../../models/ICard'
import Card from '../Card/Card'

interface ICardsProps {
	cards: ICard[]
	onCardClick: (id: number, imgSrc: string) => void
}

const Cards: FC<ICardsProps> = ({cards, onCardClick}) => {
	return (
		<>
			{cards.map((card) => (
				<Card
					key={card.id}
					imgSrc={card.imgSrc}
					id={card.id}
					onClick={onCardClick}
					isVisible={true}
					isShaking={false}
				/>
			))}
		</>
	)
}

export default Cards
