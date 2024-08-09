import React, {ReactNode} from 'react'
import styles from './Modal.module.scss'

interface IChildrenProps {
	children: ReactNode
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<IChildrenProps> = ({children, isOpen, setIsOpen}) => {
	const onClick = () => {
		setIsOpen((prev) => !prev)
	}
	return (
		<div className={`${styles['modal-out']} ${styles['shadow-appearance']}`}>
			<div className={`${styles['modal-content']} ${styles['content-block-appearance']}`}>
				{children}
				<button onClick={onClick}>Close</button>
			</div>
		</div>
	)
}

export default Modal
