import React from "react"
import TodoItem from './TodoItem'

const TodoItems = ({ itemList, setItemList, status }) => {
	
	const deleteItemHandler = (ID) => {
		const newList = itemList.filter(itemObj => {
			return itemObj.ID !== ID
		})
		setItemList(newList)
	}

	const confirmItemHandler = (ID) => {
		const newList = itemList.map(itemObj => {
			if (itemObj.ID === ID) {
				itemObj.completed = !itemObj.completed
			}
			return itemObj 
		})
		setItemList(newList)
	}

	const filterTodos = () => {
		if (status === 'Completed') {
			return itemList.filter(c => c.completed)
		}
		if (status === 'Uncompleted') {
			return itemList.filter(c => !c.completed)
		}
		return itemList
	}

  return (
		<div>
			{filterTodos().map(itemObj => (
				<TodoItem itemObj={itemObj} onDelete={deleteItemHandler} onConfirm={confirmItemHandler} key={itemObj.ID}/>
			))}
		</div>
	)
}

export default TodoItems