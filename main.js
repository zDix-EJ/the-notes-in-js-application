let notesArr = []

// Панель создания заметки
let boxInput = document.createElement('div')
boxInput.classList.add('new-card-panel')

let inputWrapper = document.createElement('div')
inputWrapper.classList.add('input-wrapper')

let titlePanel = document.createElement('h1')
titlePanel.textContent = 'Новая заметка'
titlePanel.classList.add('title-panel')

let inputTitle = document.createElement('input')
inputTitle.placeholder = 'Тема'
inputTitle.type = 'text'
inputTitle.classList.add('input-panel')

let inputImg = document.createElement('input')
inputImg.placeholder = 'Вставьте ссылку на понравившуюся картинку'
inputImg.type = 'url'
inputImg.classList.add('input-panel')

let inputDesc = document.createElement('textarea')
inputDesc.placeholder = 'Ваш текст...'
inputDesc.type = 'text'
inputDesc.classList.add('textarea-panel')

// Автоматическое расширение для текста заметки
inputDesc.addEventListener('input', () => {
	inputDesc.style.height = 'auto' // сброс высоты
	inputDesc.style.height = inputDesc.scrollHeight + 'px' // установка высоты по содержимому
})

// Создание кнопки
function getAddBtn(text) {
	let buttonAdd = document.createElement('button')
	buttonAdd.textContent = text
	buttonAdd.classList.add('btn')

	return buttonAdd
}

let addBtn = getAddBtn('Добавить заметку')
addBtn.onclick = function () {
	let titleValue = inputTitle.value
	let impValue = inputImg.value
	let descValue = inputDesc.value

	let newNoteObj = {
		title: titleValue,
		img: impValue,
		desc: descValue,
	}
	inputTitle.value = ''
	inputImg.value = ''
	inputDesc.value = ''

	notesArr.push(newNoteObj)

	render(notesArr)
}

inputWrapper.append(titlePanel, inputTitle, inputImg, inputDesc, addBtn)
boxInput.append(inputWrapper)

// Создание карточки
function getCard(card, index) {
	let cardElement = document.createElement('li')
	let cardImg = document.createElement('img')

	let cardTitle = document.createElement('h2')
	let cardDesc = document.createElement('p')

	let cardWrapperBtn = document.createElement('div')
	let cardRemoveBtn = document.createElement('button')
	let cardImportantBtn = document.createElement('button')

	cardElement.classList.add('card')
	cardImg.classList.add('card__img')
	cardTitle.classList.add('card__title')
	cardDesc.classList.add('card__desc')

	cardWrapperBtn.classList.add('btn__wrapper')
	cardRemoveBtn.classList.add('card__remove')
	cardImportantBtn.classList.add('card__btn')

	cardTitle.textContent = card.title
	cardImg.src = card.img
	cardDesc.textContent = card.desc

	cardRemoveBtn.textContent = 'Удалить'
	cardImportantBtn.textContent = 'Важное'

	// Кнопка удаления
	cardRemoveBtn.onclick = function () {
		notesArr.splice(index, 1)
		render(arrNotes)
	}
	// Кнопка важное

	cardWrapperBtn.append(cardImportantBtn, cardRemoveBtn)

	cardElement.append(cardImg, cardTitle, cardDesc, cardWrapperBtn)

	return cardElement
}

function getList() {
	let ul = document.createElement('ul')
	ul.classList.add('list')

	return ul
}

let list = getList() //положить карточку в ul

// Рендер
function render(arrNotes) {
	list.innerHTML = ''
	for (let i = 0; i < arrNotes.length; i++) {
		let newCard = getCard(arrNotes[i], i)
		list.append(newCard)
	}
}

// Вывод в HTML
document.body.append(boxInput, list)
