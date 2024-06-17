const menuBtn = document.querySelector("#menuBtn");
const video = document.querySelector("video");

let scrollTrigger = () =>{
	let tl = gsap.timeline({
		scrollTrigger:{
			trigger: '#dealership',
			start: '10% 50%',
			end: '50% 50%',
			// markers: true,
			scrub: 1,
		},
	})
	
	tl.to(".text-area-hover",{
		width: '100%',
		duration: 1
	})
	tl.from("#dealership button",{
		opacity: 0,
		scale: .2,
		ease: "power4.inOut",
		duration: 2
	})
}



let smoothScroll = () => {
	const lenis = new Lenis()

	lenis.on('scroll', (e) => {
	console.log(e)
	})

	function raf(time) {
	lenis.raf(time)
	requestAnimationFrame(raf)
	};

	requestAnimationFrame(raf);
}

let customCursor = ()=>{
	const cursorDot = document.querySelector(".cursor-dot");
	const cursorOutline = document.querySelector(".cursor-outline");

	setTimeout(()=>{
		cursorDot.style.opacity = 1;
		cursorOutline.style.opacity = 1;
	},4000)

	window.addEventListener("mousemove", (e)=>{
		const posX =e.clientX;
		const posY =e.clientY;

		cursorDot.style.left = `${posX}px`;
		cursorDot.style.top = `${posY}px`;

		cursorOutline.style.left = `${posX}px`;
		cursorOutline.style.top = `${posY}px`;

		cursorOutline.animate({
			left: `${posX}px`,
			top: `${posY}px`
		}, {duration: 500, fill: "forwards"})
	})
}

let loadingAnimation = ()=>{
	const loaderNum = document.querySelector(".loaderNum");
	let current = 0;

	function updateLoading() {
		if (current === 100) {
			return;
		}
	
		current += Math.floor(Math.random() * 10) + 1;
	
		if (current > 100) {
			current = 100;
		}
	
		loaderNum.textContent = current + "%";
		let delay = Math.floor(Math.random() * 200) + 50;
		setTimeout(updateLoading, delay);
	}
	
	function gsapAnimation(){
		gsap.to(".loaderNum", {
			delay: 3.2,
			opacity: 0,
		});
		
		gsap.to(".dark1 p", {
			opacity: 0,
			duration: 0.4,
			ease: "power4.Out",
			yoyo: true,
			repeat: 6,
		});
		
		gsap.from("#loaderImage", {
			opacity: 0,
			duration: 0.9,
			ease: "power4.Out",
			yoyo: true,
			repeat: 3,
		});
		
		gsap.to(".box", 0.8, {
			delay: 3,
			height: 0,
			stagger: {
				amount: 0.2,
			},
			ease: "easeInOut",
		});
		
		gsap.to(".loader", {
			delay: 5,
			y: "-=100%",
		});
	}

	updateLoading();
	gsapAnimation();
}

function afterLoadingAnimation(){
	setTimeout(()=>{video.play()}, 3500);

	setTimeout(()=>{
		const secondSection = document.querySelector(".secondSection");
		const thirdSection = document.querySelector(".thirdSection");
		secondSection.classList.remove('hidden');
		secondSection.classList.add('visible');

		thirdSection.classList.remove('hidden');
		thirdSection.classList.add('visible');
		// cursor();
		scrollTrigger();
	},4000)
}

let innerMenuAnimation = () => {
	let isOpen = false;
	const timeline = gsap.timeline({ paused: true }),
	closeBtn = document.querySelector(".closeBtn"),
	text = document.querySelectorAll(".nav-text"),
	menu = document.querySelector(".menu");

	timeline.to(menu, {
		duration: 0.3,
		opacity: 1,
	});

	timeline.to(
		menu,
		{
			duration: 1,
			ease: "power3.inOut",
			clipPath: "polygon(49.75% 0%, 50.25% 0%, 50.25% 100%, 49.75% 100%)",
		},
		"-=0.3"
	);

	timeline.to(menu, {
		duration: 1,
		ease: "power3.inOut",
		clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
		pointerEvents: "all",
	});

	timeline.to(
		text,
		{
			duration: 0.3,
			opacity: 1,
			stagger: 0.1,
		},
		"+=0.1"
	);

	menuBtn.addEventListener("click", () => {
		if (isOpen) {
			timeline.reverse();
		} else {
			timeline.play();
		}

		isOpen = !isOpen;
	});

	closeBtn.addEventListener("click", () => {
		if (isOpen) {
			timeline.reverse();
		} else {
			timeline.play();
		}

		isOpen = !isOpen;
	});
}

// // Rolling Text Effect
let textAnimation = () => {
	let rolling = document.querySelectorAll(".text-rolling");
	rolling.forEach((element) => {
	let innerText = element.innerText;
	element.innerHTML = "";
	let textContainer = document.createElement("div");
	textContainer.classList.add("block");
	for (let letter of innerText) {
		let span = document.createElement("span");
		span.innerText = letter.trim() === "" ? "\xa0" : letter;
		span.classList.add("letter");
		textContainer.appendChild(span);
	}
	element.appendChild(textContainer);
	element.appendChild(textContainer.cloneNode(true));
});

rolling.forEach((element) => {
	element.addEventListener("mousemove", () => {
		element.classList.remove("play");
	});
});

}

let buttonAnimation = () => {

	let line = document.querySelector(".line"),
	line1 = document.querySelector("#line1"),
	line2 = document.querySelector("#line2"),
	line3 = document.querySelector("#line3");


menuBtn.addEventListener("mouseover",function(){
    line1.style.width = "19%";
    line3.style.width = "19%";
})
menuBtn.addEventListener("mouseleave",function(){
    line1.style.width = "38%";
    line3.style.width = "38%";
})
}

function carSliderAnimation(){
	const container = document.querySelector(".carSlider");

	document.querySelector(".slider").addEventListener('input', (e) => {
		container.style.setProperty('--position', `${e.target.value}%`);
	});
}

// function cursor(){
//     Shery.mouseFollower({
//         //Parameters are optional.
//         skew: false,
//         ease: "cubic-bezier(1, 1, 1, 1)",
//         duration: 1,
//       });
// }

// smoothScroll();

customCursor();

loadingAnimation();
video.pause();

afterLoadingAnimation();

innerMenuAnimation();

textAnimation();

buttonAnimation();

carSliderAnimation();

