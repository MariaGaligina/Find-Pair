import React, {FC} from 'react'
import {useState} from 'react'
import {useAppSelector} from '../../hooks/redux'
import Cards from '../Cards/Cards'
import {css} from '@emotion/css'

interface IGameProps {}

const Game: FC<IGameProps> = () => {
	const {cards} = useAppSelector((state) => state.cardReducer)

	return (
		<div
			className={css`
				display: grid;
				gap: 15px;
				background-color: aquamarine;
				grid-template-columns: repeat(8, 1fr);
			`}>
			<Cards cards={cards} />
		</div>
	)
}

export default Game
