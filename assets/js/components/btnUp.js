const btnUp = {
	element: document.querySelector('.button_back-start'),
	scrolling: false,
	show() {
		if (this.element && !this.element.classList.contains('show')) {
			this.element.classList.add('show');
			this.element.classList.add('visible');
		}
	},
	hide() {
		if (this.element && this.element.classList.contains('show')) {
			this.element.classList.remove('visible');
			this.element.classList.remove('show');
		}
	},
	init() {
		window.addEventListener('scroll', () => {
			const scrollY = window.scrollY || document.documentElement.scrollTop;
			if (this.scrolling && scrollY > 0) {
				return;
			}
			this.scrolling = false;
			if (scrollY > 1000) {
				this.show();
			} else {
				this.hide();
			}
		});
		document.querySelector('.button_back-start').onclick = () => {
			this.scrolling = true;
			this.hide();
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		}
	}
}

export { btnUp }