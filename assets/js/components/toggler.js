export function handleToggler (element) {
    if(!element.closest('.button_toggler')) return

    const target = element.closest('.button_toggler').dataset.toggleTarget,
          targetEl = document.querySelector(target),
          toggleClass = element.closest('.button_toggler').dataset.toggleClass;

    if(target && targetEl && toggleClass) {
        targetEl.classList.toggle(toggleClass);
    }
}