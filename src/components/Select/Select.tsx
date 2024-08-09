import React, {FC} from 'react'
import {useState,useEffect} from 'react'

interface ISelectProps {
	arrayOptions: Array<string>
	title: string
	option: string
	setOption: React.Dispatch<React.SetStateAction<string>>
}

const Select: FC<ISelectProps> = ({arrayOptions, title, option, setOption}) => {
	const onClick = (event: any, index: number) => {
		setOption(arrayOptions[index])
		console.log(event.target.textContent)
		console.log(index)
	}
	return (
		<div>
			<p>
				{title}
				{option}
			</p>
			<div>
				{arrayOptions.map((option, index) => (
					<button key={index} onClick={(event) => onClick(event, index)}>
						{option}
					</button>
				))}
			</div>
		</div>
	)
}

export {Select}
export type {ISelectProps}
