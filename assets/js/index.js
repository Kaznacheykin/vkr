import '../scss/style.scss'
import '../scss/critical.scss'
import { handleSelects } from './components/select-custom'
import { handleDropdowns } from './components/dropdown'
import { handleAccordions } from "./components/accordion"
import { handleModal } from './components/modal'
import { btnUp } from './components/btnUp'
import { formsHandler } from './components/form'
import { notice } from './components/notice'
import { grecaptchaLoad } from './components/grecaptchaLoad'
import { initOnVisited } from './utils/initOnVisited'
import { changeLangBlog } from "./components/changeLangBlog";
import lazyLoad from './components/lazyLoad'
import animation from './components/animation'
import 'animate.css'
import { handleToggler } from "./components/toggler";
import {scrollTo} from "./components/scrollToEl";
import { handleHiddenLinks } from "./components/hiddenLinks";

formsHandler()
notice()
btnUp.init()
scrollTo()

initOnVisited('.lazy', lazyLoad)
initOnVisited('.animate', animation)
initOnVisited('.g-recaptcha', grecaptchaLoad)
alert('PUPOK')
document.body.addEventListener('click', function(e){
	handleSelects(e.target)
	handleModal(e.target)
	handleAccordions(e, e.target)
	changeLangBlog(e.target)
	handleToggler(e.target)
	handleHiddenLinks(e.target)
})

document.body.addEventListener( 'mouseover', function(e){
	handleDropdowns(e.target)
})






