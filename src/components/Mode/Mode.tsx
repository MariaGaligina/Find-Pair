import React from 'react'
import {Select, ISelectProps} from '../Select/Select'

interface IModeProps {
	gameOptionsArray: Array<ISelectProps>
}

const Mode: React.FC<IModeProps> = ({gameOptionsArray}) => {
	console.log(gameOptionsArray)
	return (
		<div>
			{gameOptionsArray.map((item, index) => (
				<Select {...item} key={index} />
			))}
		</div>
	)
}

export default Mode
