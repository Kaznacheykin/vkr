export function isRtl () {
	const currentDirection = document.documentElement.getAttribute('dir')
	return currentDirection === 'rtl'
}