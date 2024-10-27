import React, {ReactNode} from 'react'
import styles from './Modal.module.scss'
import cn from 'classnames'

interface IChildrenProps {
	children: ReactNode
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	result?: string
}

const Modal: React.FC<IChildrenProps> = ({children, isOpen, setIsOpen, result}) => {
	const onClick = () => {
		setIsOpen((prev) => !prev)
	}

	const onClickOutsideContent = (event: Event) => {
		const target = event.target as HTMLElement

		if (target.classList) {
			target.classList.forEach((style) => {
				if (style.includes('modal-out')) {
					setIsOpen((prev) => !prev)
				}
			})
		}
	}

	const classesOutsideModalWindow = cn([styles['modal-out']], {
		[styles['shadow-appearance']]: isOpen,
		[styles['shadow-fade']]: !isOpen,
	})

	const classesModalWindowContent = cn([styles['modal-content']], {
		[styles['content-block-appearance']]: isOpen,
		[styles['content-block-fade']]: !isOpen,
	})

	const classesResultBlock = cn({
		[styles.win]: typeof result !== undefined && result === 'win',
		[styles.loss]: typeof result !== undefined && result === 'loss',
	})

	return (
		<div
			className={classesOutsideModalWindow}
			onClick={() => {
				onClickOutsideContent(event)
			}}>
			<div className={classesModalWindowContent}>
				{children}
				{result !== '' ? (
					''
				) : (
					<div className={styles.buttons}>
						<button className={styles.button} onClick={onClick}>
							Start
						</button>
						<button className={styles.button} onClick={onClick}>
							Close
						</button>
					</div>
				)}
			</div>
			{typeof result !== undefined && (result === 'win' || result === 'loss') ? (
				<div className={classesResultBlock}></div>
			) : (
				''
			)}
		</div>
	)
}

export default Modal
