import React, { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';

import './Styles/App.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FcPlus } from "react-icons/fc"
import TodoItems from "./components/TodoItems";

const App = () => {
	//State stuff
	const [currentItem, setCurrentItem] = useState('')
	const [itemList, setItemList] = useState([])
	const [status, setStatus] = useState('All')
	const [title, setTitle] = useState("Today's tasks!")

	//Local storage
	useEffect(() => {
		setItemList(localStorage.getItem("items") === null ? [] : JSON.parse(localStorage.getItem("items")))
	}, [])

	useEffect(() => {
		localStorage.setItem("items", JSON.stringify(itemList))
	}, [itemList])

	//Functions
	const onChangeHandler = (e) => {
		setCurrentItem(e.target.value)
	}

	const addItemHandler = () => {
		if (currentItem === "" || currentItem === undefined || currentItem?.trim() === "") {
			toast.error('Enter proper value BROO 😂👌🔥!', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false
			});
		} else {
			setItemList([...itemList, { item: currentItem, ID: uuidv4(), completed: false}])
		}
		setCurrentItem("")
	}

	const clearListHandler = () => {
		if (status === 'All') {
			return setItemList([])
		}
		if (status === 'Completed') {
			return setItemList([...itemList].filter(c => !c.completed))
		}
		if (status === 'Uncompleted') {
			return setItemList([...itemList].filter(c => c.completed))
		}
	}

	const onDropDownChange = (e) => {
		setStatus(e.target.value)
		if (e.target.value === "All") {
			return setTitle("Today's tasks!")
		}
		if (e.target.value === "Completed") {
			return setTitle("Completed tasks")
		}
		if (e.target.value === "Uncompleted") {
			return setTitle('Uncompleted tasks!')
		}
	}

	

	
	return (
		<main className="todoContainer">
			<ToastContainer />
			<div className="todoWrapper">

				{/* Just "Today's task" title */}
				<h1 className="todoTitle">{title}</h1>
				
				<div className={`inputContainer ${status === 'Completed' || status === 'Uncompleted' ? 'inputContainerGone' : ''}`}>
					<input 
						name="textField"
						maxLength="30" 
						type="text" 
						placeholder="Text here, max 30 char...." 
						className="textField" 
						value={currentItem} 
						onChange={onChangeHandler}
						autoComplete="off" 
					/>			
					<button className="addButton" onClick={addItemHandler}>
						<FcPlus />
					</button>
				</div>

				<div className="todoItem">
					{/* This is where all the tasks will go. */}
					<TodoItems itemList={itemList} status={status} setItemList={setItemList} />
				</div>
				<div className="bottomWrapper">
				<button className="clearList" onClick={clearListHandler}>Clear List</button>
					<select onChange={onDropDownChange} value={status} className="chooseTasks">
						<option className="optionStyles" value="All" >All</option>
						<option className="optionStyles" value="Completed" >Completed</option>
						<option className="optionStyles" value="Uncompleted" >Uncompleted</option>
					</select>
				</div>
			</div>
		</main>

	)
}


export default App
