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
	
	// tl.to(".text-area-hover",{
	// 	width: '100%',
	// 	duration: 1
	// })
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

let loadingAnimation = () => {
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

	function gsapAnimation() {
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
};

function afterLoadingAnimation(){
	setTimeout(()=>{video.play()}, 3500);

	setTimeout(()=>{
		// const secondSection = document.querySelector(".secondSection");
		// const thirdSection = document.querySelector(".thirdSection");
		// const  circleDiv = document.querySelector("#circle");
		// const text = document.querySelector(".cover-heroText");
		// const menuBtn = document.querySelector(".menuContent");
		// menuBtn.classList.remove('hidden');
		// menuBtn.classList.add('visible');

		// // secondSection.classList.remove('hidden');
		// // secondSection.classList.add('visible');

		// text.classList.remove('hidden');
		// text.classList.add('visible');

		// circleDiv.classList.remove('hidden');
		// circleDiv.classList.add('visible');

		// thirdSection.classList.remove('hidden');
		// thirdSection.classList.add('visible');
		// // cursor();

		document.body.classList.add('show-scrollbar');
		scrollTrigger();
	},4000)
}

let modelSlider = () => {
	let currentIndex = 1;
	let totalSlides = 9;

	const updateActiveSlides = () => {
		document.querySelectorAll(".title").forEach((el, index)=>{
			if(index === currentIndex){
				el.classList.add("active");
			}else{
				el.classList.remove("active");
			}
		})
	}

	const handleSlider = () => {
		if(currentIndex < totalSlides){
			currentIndex++;
		} else{
			currentIndex = 1;
		}

		gsap.to(".slide-titles", {
			onStart: ()=>{
				setTimeout(()=>{
					updateActiveSlides();
				}, 100);

				if(currentIndex + 1 < 10){
					updateImages(currentIndex + 1);
				}else{
					updateImages(1);
				}
			},
			x: `-${(currentIndex - 1) * 8.690}%`,
			duration: 2,
			ease: "power4.out"
		});
	}

	const updateImages = (imgNumber) => {
		let imgSrc = `./assets/images/models/car${imgNumber}-.jpg`;
		const imgTop = document.createElement("img");
		const imgBottom = document.createElement("img");

		imgTop.src = imgSrc;
		imgBottom.src = imgSrc;

		// imgTop.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
		// imgBottom.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
		// imgTop.style.transform = "translateX(-100px)";
		// imgBottom.style.transform = "translateX(-100px)";

		document.querySelector(".img-top").appendChild(imgTop);
		document.querySelector(".img-bottom").appendChild(imgBottom);

		gsap.from([imgTop, imgBottom], {
			// clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
			// transform: "translateX(100px)",
			opacity: 0,
			transform: "translateX(-100px)",
			duration: 1,
			ease: "power4.out",
			// stagger: 0.15,
			onComplete: trimExcessImages,
		})
	}

	const trimExcessImages = () => {
		const selectors = [".img-top", ".img-bottom"];

		selectors.forEach((selector)=>{
			const container = document.querySelector(selector);
			const images = Array.from(container.querySelectorAll("img"));
			const excessCount = images.length - 1;
			
			if(excessCount > 0){
				images.slice(0, excessCount).forEach((image)=> container.removeChild(image));
			}
		})
	}

	document.addEventListener("DOMContentLoaded", ()=>{
		updateImages(2);
		let intervalId = setInterval(handleSlider, 3000);
		let inactivityTimeout;

		function resetInterval() {
			clearInterval(intervalId);
	
			clearTimeout(inactivityTimeout);
	
			inactivityTimeout = setTimeout(() => {
				intervalId = setInterval(handleSlider, 3000);
			}, 200);
		}

		document.querySelector(".modelSlider").addEventListener("click", ()=>{
			clearInterval(intervalId);

			handleSlider();
			
			resetInterval();
		});
	})


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
};

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
};

let buttonAnimation = () => {
	let line = document.querySelector(".line"),
		line1 = document.querySelector("#line1"),
		line2 = document.querySelector("#line2"),
		line3 = document.querySelector("#line3");

	menuBtn.addEventListener("mouseover", function () {
		line1.style.width = "19%";
		line3.style.width = "19%";
	});
	menuBtn.addEventListener("mouseleave", function () {
		line1.style.width = "38%";
		line3.style.width = "38%";
	});
};

function thirdSectionAnimation(){
	const modelName = document.querySelectorAll(".modelName");
    let para = document.querySelector(".para");
    let image = document.querySelector(".image");

	modelName.forEach((model, index)=>{
		model.addEventListener("click", ()=>{
			if(index === 0){
				document.querySelector(".verticleBar1").style.backgroundColor = "orangered";
				document.querySelector(".verticleBar2").style.backgroundColor = "rgb(80,74,69)";
				document.querySelector(".verticleBar3").style.backgroundColor = "rgb(80,74,69)";
				
				para.textContent = "Lamborghini Urus is the first Super Sport Utility Vehicle in the world, merging the soul of a super sports car with the practical functionality of an SUV. Powered by Lamborghini’s 4.0-liter twin turbo V8 engine and, in the case of Urus SE, a powerful electric motor, the Urus embodies a performance mindset that combines Fun-to-Drive with astounding vehicle capabilities. The design, performance, driving dynamics, and unbridled emotion flow effortlessly into this visionary realization of authentic Lamborghini DNA, revolutionizing an entire segment.";
				image.src = "./assets/images/news/news1.webp"
			}
			else if(index === 1){
				document.querySelector(".verticleBar2").style.backgroundColor = "orangered";
				document.querySelector(".verticleBar1").style.backgroundColor = "rgb(80,74,69)";
				document.querySelector(".verticleBar3").style.backgroundColor = "rgb(80,74,69)";

				para.textContent = "Fifty years since its unveiling at the Geneva Motor Show, the legendary Lamborghini Countach is making headlines again with a limited-series hybrid supercar celebrating the visionary design that revolutionized modern sports cars forever and laid the foundations of the Lamborghini legacy. This is the new Countach LPI 800-4. Inspired by the past, made for the future.";
				image.src = "./assets/images/news/news5.webp"
			}
			else if(index === 2){
				document.querySelector(".verticleBar3").style.backgroundColor = "orangered";
				document.querySelector(".verticleBar1").style.backgroundColor = "rgb(80,74,69)";
				document.querySelector(".verticleBar2").style.backgroundColor = "rgb(80,74,69)";

				para.textContent = "A super-sports car created with a singular purpose, the Huracán STO delivers all the feel and technology of a genuine race car in a road-legal model. Lamborghini’s years-long motorsport know-how, intensified by a winning heritage, is concentrated in the new Huracán STO. Its extreme aerodynamics, track-honed handling dynamics, lightweight contents and the highest-performing V10 engine to date come together, ready to trigger all the emotions of the racetrack in your everyday life.";
				image.src = "./assets/images/news/news3.jpg"
			}

			model.style.color = "white";
			gsap.from(".para",{
				opacity: 0,
				duration: 0.5,
				ease: Expo.easeInOut
			});
			gsap.from(".image",{
				opacity: 0,
				duration: 0.5,
				ease: Expo.easeInOut
			});
		});
	});
}

function carSliderAnimation() {
	const container = document.querySelector(".carSlider");

	document.querySelector(".slider").addEventListener("input", (e) => {
		container.style.setProperty("--position", `${e.target.value}%`);
	});
}

let horizontalScroll = () => {
	gsap.registerPlugin(ScrollTrigger);

	const sectionWidth = document.querySelector(".scroll-section-inner").offsetWidth;
	let amountToScroll = sectionWidth - window.innerWidth;

	gsap.to(".scroll-section-inner",{
        x: -amountToScroll,
        ease: "none",
        duration: 1,
        scrollTrigger: {
            trigger: ".scroll-section-inner",
            start: "top top",
            end: `+=${sectionWidth}px`,
            pin: true,
            scrub: 1,
            // markers: true
        },
    });
}

// let horizontalScrollCardAnimation = () => {
// 	let card = document.querySelector(".newsCard");
// 	const overlay = document.querySelector(".colorDiv");

// 	// cards.forEach((card)=>{
// 		card.addEventListener("mouseenter", ()=>{
// 			// card.style.backgroundColor = "green";
// 			gsap.from(".colorDiv", {
// 				y: "-=100%",
// 				opacity: 0,
// 				duration: 1,
// 				ease: "power4.out"
// 			})

// 		})

// 		card.addEventListener("mouseleave", ()=>{
// 			// card.style.backgroundColor = "black";
// 		})
// 	// })
// }

// function cursor(){
//     Shery.mouseFollower({
//         //Parameters are optional.
//         skew: false,
//         ease: "cubic-bezier(1, 1, 1, 1)",
//         duration: 1,
//       });
// }

customCursor();

loadingAnimation();
video.pause();

afterLoadingAnimation();

innerMenuAnimation();

modelSlider();

textAnimation();

buttonAnimation();

thirdSectionAnimation();

// horizontalScrollCardAnimation()

horizontalScroll();

// carSliderAnimation();