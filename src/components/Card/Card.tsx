import {FC} from 'react'
import {ICard} from '../../models/ICard'
import {css} from '@emotion/css'

interface CardProps {
	imgSrc: string
	id: number
	onClick: (id: number, imgSrc: string) => void
	isShaking: boolean
	isVisible: boolean
}

const Card: FC<CardProps> = ({imgSrc, id, onClick}) => {
	return (
		<div
			className={css`
				max-width: 200px;
			`}
			onClick={() => onClick(id, imgSrc)}>
			<img
				src={imgSrc}
				alt='not found'
				className={css`
					aspect-ratio: 1/1.5;
					width: 100%;
					height: 100%;
					object-fit: cover;
				`}></img>
		</div>
	)
}

export default Card
