import React from 'react'
import {Select, ISelectProps} from '../Select/Select'
import {css} from '@emotion/css'

interface IModeProps {
	gameOptionsArray: Array<ISelectProps>
}

const Mode: React.FC<IModeProps> = ({gameOptionsArray}) => {
	const modeStyles = css`
		display: flex;
		flex-direction: column;
		gap: 10px;
	`

	return (
		<div className={modeStyles}>
			{gameOptionsArray.map((item, index) => (
				<Select {...item} key={index} />
			))}
		</div>
	)
}

export default Mode
