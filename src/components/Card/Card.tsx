import {FC, useEffect} from 'react'
import {ICard} from '../../models/ICard'
import {css} from '@emotion/css'
import cn from 'classnames'
import styles from './Card.module.scss'

interface CardProps {
	id: number
	imgSrc: string
	onClick: (id: number, imgSrc: string, isClickable: boolean) => void
	isClickable: boolean
	isFound: boolean
	isSelected: boolean
	isShaken: boolean
}

const Card: FC<CardProps> = ({id, imgSrc, onClick, isClickable, isFound, isSelected, isShaken}) => {
	const classesCard = cn([styles.card], {
		[styles.not_clickable]: !isClickable,
		[styles.not_clickable]: isFound,
		//[styles.founded]: isFound,
		//[styles.shaken]: isShaken,
	})

	const classesCardFront = cn([styles.card__front], {
		[styles.not_clickable]: !isClickable,
		[styles.selected_front]: isSelected || isShaken || isFound,
	})
	const classesCardBack = cn(
		[styles.card__back],
		{
			[styles.selected_back]: isSelected || isShaken || isFound,
		},
		{
			//[styles.not_clickable]: isClickable,
			[styles.founded]: isFound,
			[styles.shaken]: isShaken,
		}
	)
	return (
		<div className={classesCard} onClick={() => onClick(id, imgSrc, isClickable)}>
			<div className={classesCardFront}>
				<img
					src='https://bogatyr.club/uploads/posts/2023-01/1675011031_bogatyr-club-p-fon-geometriya-fon-instagram-14.jpg'
					alt='not found'
				/>
			</div>
			<div className={classesCardBack}>
				<img src={imgSrc} alt='not found' />
			</div>
		</div>
	)
}

export default Card
