// Массив данных + два для наглядного примера
let notesArr = [
	{
		title: 'Британская кошка',
		img: 'https://жизньпитомца.рф/upload/iblock/f36/f36cc496802e10056b9bee7fa6114464.jpg',
		desc: 'Современные британские короткошерстные кошки – это хорошо сложенные животные от среднего до крупного размера с мощным телом, коренастыми ногами и крепкими округлыми лапами. Вес взрослого животного колеблется от 3 до 7 кг, коты крупнее кошек. Круглую голову венчают широко поставленные уши средних размеров. А мордочка с полными щечками и большими круглыми распахнутыми глазами никого не оставит равнодушным.',
		done: false,
	},
	{
		title: 'Русская голубая кошка',
		img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Jasmina.JPG/1280px-Jasmina.JPG',
		desc: 'Русские голубые кошки отличаются своим изяществом и благородством внешнего вида, их мягкая короткая шерсть голубого цвета с серебристым отливом оригинально сочетается с необыкновенными зелеными глазами. Кошки имеют прекрасный прямой профиль, форма мордочки клиновидная, череп плоский и длинный, специалистами не приветствуется круглая четырехугольная форма головы.',
		done: true,
	},
]

// Панель создания заметки
let boxInput = document.createElement('div')
boxInput.classList.add('new-card-panel')

let inputWrapper = document.createElement('div')
inputWrapper.classList.add('input-wrapper')

let titlePanel = document.createElement('h1')
titlePanel.textContent = 'Новая заметка'
titlePanel.classList.add('title-panel')

// Тема
let inputTitle = document.createElement('input')
inputTitle.placeholder = 'Тема'
inputTitle.type = 'text'
inputTitle.classList.add('input-panel')
// Валидация
let spanErrorTitle = document.createElement('span')
spanErrorTitle.textContent = 'Поле не может быть пустым.'
spanErrorTitle.classList.add('error')

// Картинка
let inputImg = document.createElement('input')
inputImg.placeholder = 'Вставьте ссылку на понравившуюся картинку'
inputImg.type = 'url'
inputImg.classList.add('input-panel')
// Валидация
let spanErrorImg = document.createElement('span')
spanErrorImg.textContent = 'Добавьте картинку.'
spanErrorImg.classList.add('error')

// Основной текст
let inputDesc = document.createElement('textarea')
inputDesc.placeholder = 'Ваш текст...'
inputDesc.type = 'text'
inputDesc.classList.add('textarea-panel')
// Валидация
let spanErrorDesc = document.createElement('span')
spanErrorDesc.textContent = 'Поле не может быть пустым.'
spanErrorDesc.classList.add('error')

// Автоматическое расширение для текста заметки
inputDesc.addEventListener('input', () => {
	inputDesc.style.height = 'auto' // сброс высоты
	inputDesc.style.height = inputDesc.scrollHeight + 'px' // установка высоты по содержимому
})

// Создание кнопки добавления
function getAddBtn(text) {
	let buttonAdd = document.createElement('button')
	buttonAdd.textContent = text
	buttonAdd.classList.add('btn')

	return buttonAdd
}

let addBtn = getAddBtn('Добавить заметку')
addBtn.onclick = function () {
	// Беру значения
	let titleValue = inputTitle.value
	let imgValue = inputImg.value
	let descValue = inputDesc.value

	// Валидация - заголовок
	function checkTitle() {
		if (titleValue === '') {
			spanErrorTitle.style.display = 'block'
			return true
		} else {
			spanErrorTitle.style.display = 'none'
			return false
		}
	}
	// Валидация - ссылки
	function checkImg() {
		if (imgValue === '') {
			spanErrorImg.style.display = 'block'
			return true
		} else {
			spanErrorImg.style.display = 'none'
			return false
		}
	}

	// Валидация - текста
	function checkDesc() {
		if (descValue === '') {
			spanErrorDesc.style.display = 'block'
			return true
		} else {
			spanErrorDesc.style.display = 'none'
			return false
		}
	}

	// Проверка полей
	let errorTitle = checkTitle()
	let errorImg = checkImg()
	let errorDesc = checkDesc()

	// Если есть хоть одна ошибка — не добавляем заметку
	if (errorTitle || errorImg || errorDesc) {
		return
	}
	if (editIndex !== null) {
		// Редактирование существующей заметки
		notesArr[editIndex].title = titleValue
		notesArr[editIndex].img = imgValue
		notesArr[editIndex].desc = descValue

		editIndex = null
		addBtn.textContent = 'Добавить заметку'
	} else {
		let newNoteObj = {
			title: titleValue,
			img: imgValue,
			desc: descValue,
			done: false,
		}
		notesArr.push(newNoteObj)
	}

	render(notesArr)

	// Очистка
	inputTitle.value = ''
	inputImg.value = ''
	inputDesc.value = ''
}

inputWrapper.append(
	titlePanel,
	inputTitle,
	spanErrorTitle,
	inputImg,
	spanErrorImg,
	inputDesc,
	spanErrorDesc,
	addBtn
)
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
	let cardEditBtn = document.createElement('button')

	if (card.done === true) {
		cardElement.classList.add('card-important')
	}

	cardElement.classList.add('card')
	cardImg.classList.add('card__img')
	cardTitle.classList.add('card__title')
	cardDesc.classList.add('card__desc')

	cardWrapperBtn.classList.add('btn__wrapper')
	cardRemoveBtn.classList.add('card__remove')
	cardEditBtn.classList.add('card__edit')
	cardImportantBtn.classList.add('card__btn')

	cardTitle.textContent = card.title
	cardImg.src = card.img
	cardDesc.textContent = card.desc

	cardRemoveBtn.textContent = 'Удалить'
	cardEditBtn.textContent = 'Изменить'
	cardImportantBtn.textContent = 'Важное'

	// Кнопка важное
	cardImportantBtn.onclick = function () {
		if (cardElement.classList.contains('card-important') === false) {
			cardElement.classList.add('card-important')
			cardImportantBtn.textContent = 'Не важное'
			card.done = true
		} else {
			cardElement.classList.remove('card-important')
			cardImportantBtn.textContent = 'Важное'
			card.done = false
		}
	}

	// Кнопка изменения
	cardEditBtn.onclick = function () {
		// Заполняем поля ввода данными выбранной заметки
		inputTitle.value = card.title
		inputImg.value = card.img
		inputDesc.value = card.desc

		// Сохраняем индекс редактируемой заметки
		editIndex = index

		// Меняем текст кнопки на "Сохранить изменения"
		addBtn.textContent = 'Сохранить изменения'
	}

	// Кнопка удаления
	cardRemoveBtn.onclick = function () {
		notesArr.splice(index, 1)
		render(notesArr)
	}

	cardWrapperBtn.append(cardImportantBtn, cardEditBtn, cardRemoveBtn)

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
render(notesArr)
// Вывод в HTML
document.body.append(boxInput, list)
