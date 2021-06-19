import React from "react"
import { FcCancel, FcCheckmark } from "react-icons/fc"

const TodoItem = ({ itemObj, onDelete, onConfirm }) => (
	<div className={`itemContainer ${itemObj.completed ? "itemCompleted" : ''}`} >
		<div className={`itemText ${itemObj.completed ? "completed" : ''}`}>{itemObj.item}</div>
		<div className="confirmIcon">
			<button className={`itemIcon ${itemObj.completed ? "confirmIconCompleted" : ''}`} onClick={() => onConfirm(itemObj.ID)}>
				<FcCheckmark />
			</button>
		</div>
		<div className="deleteIcon">
			<button className={`itemIcon ${itemObj.completed ? "deleteIconCompleted" : ''}`} onClick={() => onDelete(itemObj.ID)}>
				<FcCancel color="blue" />
			</button>
		</div>
	</div>
)

export default TodoItem

