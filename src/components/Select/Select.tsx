import {FC} from 'react'
import styles from './Select.module.scss'

interface ISelectProps {
	arrayOptions: Array<string>
	title: string
	option: string
	setOption: React.Dispatch<React.SetStateAction<string>>
}

const Select: FC<ISelectProps> = ({arrayOptions, title, option, setOption}) => {
	const onClick = (index: number) => {
		setOption(arrayOptions[index])
	}
	return (
		<div className={styles.title}>
			<span>{title}</span>
			<span className={styles['selected-option']}>{option}</span>
			<div className={styles.options}>
				{arrayOptions.map((option, index) => (
					<button className={styles.option} key={index} onClick={() => onClick(index)}>
						{option}
					</button>
				))}
			</div>
		</div>
	)
}

export {Select}
export type {ISelectProps}
