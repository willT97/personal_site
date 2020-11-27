// animate the squares fading in and slight rotation?
// first fade in

let s2_p = getComputedStyle(document.querySelector('#square-2'))
let s3_p = getComputedStyle(document.querySelector('#square-3'))

let s3_p_rotation = s3_p.getPropertyValue('transform')
let s2_p_rotation = s2_p.getPropertyValue('transform')


let values = s3_p_rotation.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');

let angle = Math.round(Math.atan2(values[1], values[0]) * (180/Math.PI));



let values2 = s2_p_rotation.split('(')[1];
    values2 = values2.split(')')[0];
    values2 = values2.split(',');

let angle2 = Math.round(Math.atan2(values2[1], values2[0]) * (180/Math.PI));


let state = captureState("#square-1, #square-2, #square-3, .person-sitting")
let tl = gsap.timeline({ onComplete: () => {
    revertState(state)}})

tl.set('#square-1', {autoAlpha: 0})
tl.set('#square-2', {autoAlpha: 0})
tl.from('#square-3', {
    duration:0.6, 
    height: (Number(s3_p.height.substring(0, s3_p.height.length - 2)) - 40) + "px",
    top: (Number(s3_p.top.substring(0, s3_p.top.length - 2)) - 150) + "px", 
    autoAlpha: 0,
    rotation: angle - 20,
    left: (Number(s3_p.left.substring(0, s3_p.left.length - 2)) + 150) + "px",
    ease:Linear.easeNone
})
tl.from('#square-2', {
    duration:0.4, 
    height:s3_p.height,
    top: s3_p.top, 
    autoAlpha: 0.25,
    rotation: angle,
    left: s3_p.left,
    ease:Linear.easeNone
})
tl.from('#square-1', {
    duration:0.4, 
    height:s2_p.height,
    top: s2_p.top, 
    autoAlpha: 0.35,
    rotation: angle2,
    left: s2_p.left,
    ease:Linear.easeOut
})
tl.from('.main-content', {
    opacity: 0,
    duration: 1
})
tl.from('.inner-blur', {
    opacity: 0,
    duration: 2
})
// reset the css properties of each element
// https://greensock.com/forums/topic/9045-after-using-tween-not-able-to-change-css-value/
// use this to reset properties in complete callback
// option 3 on this https://greensock.com/forums/topic/25879-reset-timeline-on-complete/
// https://stackoverflow.com/questions/21978416/clear-an-inline-style-which-is-set-by-a-gsap-animation/22007925
// above clears inline styles:w

function captureState(elements) {
	let state = [];
	gsap.utils.toArray(elements).forEach(element => state.push(element, element.style.cssText));
	return state;
}

// revert the inline styles
function revertState(state) {
	for (let i = 0; i < state.length; i+=2) {
		state[i].style.cssText = state[i+1];
	}
}