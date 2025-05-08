export class Notifier {
	static instance
	_timeVisible = 7000

	constructor() {

		if (Notifier.instance) {
			return Notifier.instance
		}
		Notifier.instance = this

		this.#init()
	}

	info (msg) {
		this.#show('info', msg)
	}

	error (msg) {
		this.#show('error', msg)
	}

	success (msg) {
		this.#show('success', msg)
	}

	warning (msg) {
		this.#show('warning', msg)
	}

	clear () {
		this.#getContainer().innerHTML = ""

		return this
	}

	hide (element) {
		element.classList.add('notification__item_hidden')

		setTimeout(()=>{
			element.remove()
		}, 1000)
	}

	#init () {
		const wrap = document.createElement('ul')
		wrap.classList.add('notification')

		document.body.insertAdjacentHTML('beforeend', wrap.outerHTML)
	}

	#getContainer () {
		let container = document.querySelector('.notification')

		if(!container) {
			this.#init()
			container = this.#getContainer()
		}

		return container
	}

	#getLastAdded () {
		return this.#getContainer().lastElementChild
	}

	#show (type, msg) {
		const notificationItem = this.#createItem()

		notificationItem.textContent = msg
		notificationItem.classList.add(type)

		this.#getContainer().insertAdjacentHTML('beforeend', notificationItem.outerHTML)

		this.#addEvents(this.#getLastAdded())
		this.#getLastAdded().classList.remove('notification__item_hidden')
	}

	#addEvents (item) {
		item.addEventListener('click', (e)=>{this.hide(e.target)})

		setTimeout(()=>{
			this.hide(item)
		}, this._timeVisible)
	}

	#createItem () {
		const element = document.createElement('li')
		element.classList.add('notification__item', 'text', 'notification__item_hidden')

		return element
	}
}