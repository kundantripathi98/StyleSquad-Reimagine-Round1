const menuBtn = document.querySelector("#menuBtn");
const video = document.querySelector("video");

window.addEventListener("load", () => {
	if (window.location.hash) {
		// Remove the hash from the URL
		history.replaceState(null, null, window.location.href.split("#")[0]);

		// Ensure the scroll to top happens after the browser finishes loading
		const scrollToTop = () => {
			console.log("Scrolling to top");
			window.scrollTo(0, 0);
		};

		const ensureScrollToTop = () => {
			console.log("Ensuring scroll to top");
			requestAnimationFrame(() => {
				setTimeout(scrollToTop, 50); // Slightly longer delay
			});
		};

		ensureScrollToTop();
		setTimeout(ensureScrollToTop, 200); // Attempt again after 200ms for robustness
	}

	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	scrollToTop();
	requestAnimationFrame(scrollToTop);
});

let scrollToNextSection = () => {
    const nextSection = document.getElementById("models");
    const offsetTop = nextSection.offsetTop;
    window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
    });
};


let progressScrollBar = () => {
	let filled = document.querySelector(".filled");

	function update() {
		filled.style.width = `${
			(window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
		}%`;
		requestAnimationFrame(update);
	}
	update();
};

let scrollTrigger = () => {
	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: "#dealership",
			start: "10% 50%",
			end: "50% 50%",
			// markers: true,
			scrub: 1,
		},
	});

	// tl.to(".text-area-hover",{
	// 	width: '100%',
	// 	duration: 1
	// })
	tl.from("#dealership button", {
		opacity: 0,
		scale: 0.2,
		ease: "bounce",
		duration: 2,
	});
};

let smoothScroll = () => {
	const lenis = new Lenis();

	lenis.on("scroll", (e) => {

	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);
};

let customCursor = () => {
	const cursorDot = document.querySelector(".cursor-dot");
	const cursorOutline = document.querySelector(".cursor-outline");

	setTimeout(() => {
		cursorDot.style.opacity = 1;
		cursorOutline.style.opacity = 1;
	}, 4000);

	window.addEventListener("mousemove", (e) => {
		const posX = e.clientX;
		const posY = e.clientY;

		cursorDot.style.left = `${posX}px`;
		cursorDot.style.top = `${posY}px`;

		cursorOutline.style.left = `${posX}px`;
		cursorOutline.style.top = `${posY}px`;

		cursorOutline.animate(
			{
				left: `${posX}px`,
				top: `${posY}px`,
			},
			{ duration: 500, fill: "forwards" }
		);
	});
};

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

function afterLoadingAnimation() {
	setTimeout(() => {
		video.play();
	}, 3500);

	setTimeout(() => {
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

		document.body.classList.add("show-scrollbar");
		scrollTrigger();
	}, 4000);
}

let heroSectionAnimation = () => {
	gsap.to(".boundingelem", {
		y: 0,
		ease: "elastic",
		opacity: 1,
		delay: 3,
		duration: 1.3,
		stagger: 0.3,
	});

	let timeline = gsap.timeline();

	gsap.registerPlugin(ScrollTrigger);
	const navbar = document.querySelector("nav");
	const navLinks = navbar.querySelectorAll(".nav-links a");

	gsap.from("nav", {
		scale: 0.8,
		opacity: 0,
		duration: 1,
		delay: 3.1,
		ease: "elastic",
		onComplete: () => {
			ScrollTrigger.create({
				trigger: ".heroSection",
				start: "40% 30%",
				end: "bottom top",
				// markers: true,
				onEnter: () => {
					gsap.to(navbar, { width: "5%", duration: 0.5 });
					gsap.to(navLinks, { opacity: 0, duration: 0.5 });
				},
				onLeaveBack: () => {
					gsap.to(navbar, { width: "97%", duration: 0.5 });
					gsap.to(navLinks, { opacity: 1, duration: 0.5 });
				},
			});

			navbar.addEventListener("mouseenter", () => {
				gsap.to(navbar, { width: "97%", duration: 0.5 });
				gsap.to(navLinks, { opacity: 1, duration: 0.5 });
			});

			navbar.addEventListener("mouseleave", () => {
				if (
					window.scrollY >= document.querySelector(".modelSlider").offsetTop
				) {
					gsap.to(navbar, { width: "5%", duration: 0.5 });
					gsap.to(navLinks, { opacity: 0, duration: 0.5 });
				}
			});
		},
	});

	timeline
		.from(".link", {
			y: -10,
			opacity: 0,
			duration: 1,
			delay: 3.5,
			ease: "bounce",
			stagger: 0.1,
		})
		.from(".heading", {
			y: "100%",
			ease: "bounce",
			opacity: 0,
			stagger: 0.3,
			duration: 1,
		})
		.addLabel("simultaneousStart", "+=0")
		.from(
			".circle-text",
			{
				x: "-=100%",
				ease: "elastic",
				opacity: 0,
				duration: 2,
			},
			"simultaneousStart"
		)
		.from(
			".hero-video",
			{
				x: "100%",
				ease: "elastic",
				opacity: 0,
				duration: 5,
			},
			"simultaneousStart"
		)
		.from(
			"#menuBtn",
			{
				y: "100%",
				ease: "bounce",
				opacity: 0,
				duration: 1,
			},
			"simultaneousStart"
		);
};

let modelSlider = () => {
	let currentIndex = 1;
	let totalSlides = 9;

	const updateActiveSlides = () => {
		document.querySelectorAll(".title").forEach((el, index) => {
			if (index === currentIndex) {
				el.classList.add("active");
			} else {
				el.classList.remove("active");
			}
		});
	};

	const handleSlider = () => {
		if (currentIndex < totalSlides) {
			currentIndex++;
		} else {
			currentIndex = 1;
		}

		gsap.to(".slide-titles", {
			onStart: () => {
				setTimeout(() => {
					updateActiveSlides();
				}, 100);

				if (currentIndex + 1 < 10) {
					updateImages(currentIndex + 1);
				} else {
					updateImages(1);
				}
			},
			x: `-${(currentIndex - 1) * 8.69}%`,
			duration: 2,
			ease: "power4.out",
		});
	};

	const updateImages = (imgNumber) => {
		let imgSrc = `./assets/images/models/car${imgNumber}-.jpg`;
		const imgTop = document.createElement("img");
		const imgBottom = document.createElement("img");

		imgTop.src = imgSrc;
		imgBottom.src = imgSrc;

		document.querySelector(".img-top").appendChild(imgTop);
		document.querySelector(".img-bottom").appendChild(imgBottom);

		gsap.from([imgTop, imgBottom], {
			opacity: 0,
			transform: "translateX(-100px)",
			duration: 1,
			ease: "power4.out",
			onComplete: trimExcessImages,
		});
	};

	const trimExcessImages = () => {
		const selectors = [".img-top", ".img-bottom"];

		selectors.forEach((selector) => {
			const container = document.querySelector(selector);
			const images = Array.from(container.querySelectorAll("img"));
			const excessCount = images.length - 1;

			if (excessCount > 0) {
				images
					.slice(0, excessCount)
					.forEach((image) => container.removeChild(image));
			}
		});
	};

	document.addEventListener("DOMContentLoaded", () => {
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

		document.querySelector(".modelSlider").addEventListener("click", () => {
			clearInterval(intervalId);

			handleSlider();

			resetInterval();
		});
	});
};

let innerMenuAnimation = () => {
	let isOpen = false;
	const timeline = gsap.timeline({ paused: true }),
		closeBtn = document.querySelector(".closeBtn"),
		text = document.querySelectorAll(".nav-text"),
		menu = document.querySelector(".menu");

	const links = document.querySelectorAll(".links");
	const hiddenLink = document.querySelector(".hidden-link");
	const backBtn = document.querySelector(".backBtn");

	timeline.to(menu, {
		duration: 0.1,
		opacity: 1,
	});

	timeline.to(
		menu,
		{
			duration: 0.5,
			ease: "power3.inOut",
			clipPath: "polygon(49.75% 0%, 50.25% 0%, 50.25% 100%, 49.75% 100%)",
		},
		"-=0.3"
	);

	timeline.to(menu, {
		duration: 0.5,
		ease: "power3.inOut",
		clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
		pointerEvents: "all",
	});

	timeline.to(
		text,
		{
			duration: 0.1,
			opacity: 1,
			stagger: 0.1,
		},
		"+=0.1"
	);

	timeline
		.from(links, {
			opacity: 0,
			duration: 0.2,
			stagger: 0.1,
		})
		.from(hiddenLink, {
			opacity: 0,
			duration: 0.2,
			stagger: 0.1,
		});

	hiddenLink.addEventListener("click", () => {
		links.forEach((link) => {
			link.style.opacity = 0;
		});
		hiddenLink.style.opacity = 0;

		let tl = gsap.timeline();

		tl.to(".hiddenLinks", {
			y: "0%",
			duration: 0.9,
			ease: Expo.easeInOut,
		});
	});

	backBtn.addEventListener("click", () => {
		let tl = gsap.timeline();
		tl.to(".hiddenLinks", {
			y: "100%",
			duration: 0.9,
			ease: Expo.easeInOut,
		})
			.to(links, {
				opacity: 1,
				duration: 0.9,
				// delay: 0.5,
				stagger: 0.1,
				ease: Expo.easeInOut,
			})
			.to(hiddenLink, {
				opacity: 1,
				duration: 0.9,
				// delay: 0.5,
				ease: Expo.easeInOut,
			});
	});

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
		backBtn.click();
	});

	links.forEach((link) => {
		link.addEventListener("click", () => {
			if (isOpen) {
				timeline.reverse();
			} else {
				timeline.play();
			}

			isOpen = !isOpen;
		});
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

function thirdSectionAnimation() {
	const modelName = document.querySelectorAll(".modelName");
	let para = document.querySelector(".para");
	let power = document.querySelector("#power");
	let speed = document.querySelector("#speed");
	let time = document.querySelector("#time");
	modelName[0].style.color = "white";
	previousModel = modelName[0];
	let image = document.querySelector(".image");

	modelName.forEach((model, index) => {
		model.addEventListener("click", () => {
			if (previousModel) {
				previousModel.style.color = "rgb(80,74,69)";
			}
			if (index === 0) {
				document.querySelector(".verticleBar1").style.backgroundColor =
					"orangered";
				document.querySelector(".verticleBar2").style.backgroundColor =
					"rgb(80,74,69)";
				document.querySelector(".verticleBar3").style.backgroundColor =
					"rgb(80,74,69)";

				power.textContent = "666 CV / 490 kW";
				speed.textContent = "306 km/h";
				time.textContent = "3.3s";

				para.textContent =
					"Lamborghini Urus is the first Super Sport Utility Vehicle in the world, merging the soul of a super sports car with the practical functionality of an SUV. Powered by Lamborghini’s 4.0-liter twin turbo V8 engine and, in the case of Urus SE, a powerful electric motor, the Urus embodies a performance mindset that combines Fun-to-Drive with astounding vehicle capabilities. The design, performance, driving dynamics, and unbridled emotion flow effortlessly into this visionary realization of authentic Lamborghini DNA, revolutionizing an entire segment.";
				image.src = "./assets/images/specification/urus.jpg";
				image.alt = "urus";
			} else if (index === 1) {
				document.querySelector(".verticleBar2").style.backgroundColor =
					"orangered";
				document.querySelector(".verticleBar1").style.backgroundColor =
					"rgb(80,74,69)";
				document.querySelector(".verticleBar3").style.backgroundColor =
					"rgb(80,74,69)";

				power.textContent = "814 CV / 599 kW";
				speed.textContent = "355 km/h";
				time.textContent = "2.8s";

				para.textContent =
					"Fifty years since its unveiling at the Geneva Motor Show, the legendary Lamborghini Countach is making headlines again with a limited-series hybrid supercar celebrating the visionary design that revolutionized modern sports cars forever and laid the foundations of the Lamborghini legacy. This is the new Countach LPI 800-4. Inspired by the past, made for the future.";
					image.src = "./assets/images/specification/countach.jpg";
					image.alt = "countach";
				} else if (index === 2) {
				document.querySelector(".verticleBar3").style.backgroundColor =
					"orangered";
				document.querySelector(".verticleBar1").style.backgroundColor =
					"rgb(80,74,69)";
				document.querySelector(".verticleBar2").style.backgroundColor =
					"rgb(80,74,69)";

				power.textContent = "640 CV / 470 kW";
				speed.textContent = "310 km/h";
				time.textContent = "3.0s";

				para.textContent =
					"A super-sports car created with a singular purpose, the Huracán STO delivers all the feel and technology of a genuine race car in a road-legal model. Lamborghini’s years-long motorsport know-how, intensified by a winning heritage, is concentrated in the new Huracán STO. Its extreme aerodynamics, track-honed handling dynamics, lightweight contents and the highest-performing V10 engine to date come together, ready to trigger all the emotions of the racetrack in your everyday life.";
					image.src = "./assets/images/specification/huracan.jpg";
					image.alt = "huracan";			}

			model.style.color = "white";
			previousModel = model;

			gsap.from(".para", {
				opacity: 0,
				duration: 0.5,
				ease: Expo.easeInOut,
			});

			gsap.from(".topic", {
				opacity: 0,
				duration: 0.5,
				ease: Expo.easeInOut,
			});

			gsap.from(".image", {
				opacity: 0,
				duration: 0.5,
				ease: Expo.easeInOut,
			});
		});
	});
}

function mobileThirdSectionAnimation() {
	const modelName = document.querySelectorAll(".modelName1");
	let para = document.querySelector(".mobilePara");
	let power = document.querySelector("#mobilePower");
	let speed = document.querySelector("#mobileSpeed");
	let time = document.querySelector("#mobileTime");
	modelName[0].style.color = "white";
	previousModel = modelName[0];
	let image = document.querySelector(".mobileImage");

	modelName.forEach((model, index) => {
		model.addEventListener("click", () => {
			if (previousModel) {
				previousModel.style.color = "rgb(80,74,69)";
			}
			if (index === 0) {
				document.querySelector(".mobileVerticleBar1").style.backgroundColor =
					"orangered";
				document.querySelector(".mobileVerticleBar2").style.backgroundColor =
					"rgb(80,74,69)";
				document.querySelector(".mobileVerticleBar3").style.backgroundColor =
					"rgb(80,74,69)";

				power.textContent = "666 CV / 490 kW";
				speed.textContent = "306 km/h";
				time.textContent = "3.3s";

				para.textContent =
					"Lamborghini Urus is the first Super Sport Utility Vehicle in the world, merging the soul of a super sports car with the practical functionality of an SUV. Powered by Lamborghini’s 4.0-liter twin turbo V8 engine and, in the case of Urus SE, a powerful electric motor, the Urus embodies a performance mindset that combines Fun-to-Drive with astounding vehicle capabilities. The design, performance, driving dynamics, and unbridled emotion flow effortlessly into this visionary realization of authentic Lamborghini DNA, revolutionizing an entire segment.";
				// image.src = "./assets/images/news/news1.webp";
				image.src = "./assets/images/specification/urus.jpg";
			} else if (index === 1) {
				document.querySelector(".mobileVerticleBar2").style.backgroundColor =
					"orangered";
				document.querySelector(".mobileVerticleBar1").style.backgroundColor =
					"rgb(80,74,69)";
				document.querySelector(".mobileVerticleBar3").style.backgroundColor =
					"rgb(80,74,69)";

				power.textContent = "814 CV / 599 kW";
				speed.textContent = "355 km/h";
				time.textContent = "2.8s";

				para.textContent =
					"Fifty years since its unveiling at the Geneva Motor Show, the legendary Lamborghini Countach is making headlines again with a limited-series hybrid supercar celebrating the visionary design that revolutionized modern sports cars forever and laid the foundations of the Lamborghini legacy. This is the new Countach LPI 800-4. Inspired by the past, made for the future.";
				// image.src = "./assets/images/news/news5.webp";
				image.src = "./assets/images/specification/countach.jpg";
			} else if (index === 2) {
				document.querySelector(".mobileVerticleBar3").style.backgroundColor =
					"orangered";
				document.querySelector(".mobileVerticleBar1").style.backgroundColor =
					"rgb(80,74,69)";
				document.querySelector(".mobileVerticleBar2").style.backgroundColor =
					"rgb(80,74,69)";

				power.textContent = "640 CV / 470 kW";
				speed.textContent = "310 km/h";
				time.textContent = "3.0s";

				para.textContent =
					"A super-sports car created with a singular purpose, the Huracán STO delivers all the feel and technology of a genuine race car in a road-legal model. Lamborghini’s years-long motorsport know-how, intensified by a winning heritage, is concentrated in the new Huracán STO. Its extreme aerodynamics, track-honed handling dynamics, lightweight contents and the highest-performing V10 engine to date come together, ready to trigger all the emotions of the racetrack in your everyday life.";
				// image.src = "./assets/images/news/news3.jpg";
				image.src = "./assets/images/specification/huracan.jpg";
			}

			model.style.color = "white";
			previousModel = model;

			gsap.from(".mobilePara", {
				opacity: 0,
				duration: 0.5,
				ease: Expo.easeInOut,
			});

			gsap.from(".topic", {
				opacity: 0,
				duration: 0.5,
				ease: Expo.easeInOut,
			});

			gsap.from(".mobileImage", {
				opacity: 0,
				duration: 0.5,
				ease: Expo.easeInOut,
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

let fifthSection = () => {
	gsap.registerPlugin(ScrollTrigger);

	const sectionWidth = document.querySelector(
		".scroll-section-inner"
	).offsetWidth;
	let amountToScroll = sectionWidth - window.innerWidth;

	gsap.to(".scroll-section-inner", {
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
};

let scrollAnimation = () =>{
	gsap.registerPlugin(ScrollTrigger);
	
	gsap.to(".heroSection", {
		scrollTrigger: {
			trigger: ".heroSection",
			start: "top top",
			// end: "90% 100%",
			end: () =>
				"+=" +
				(window.innerHeight +
					document.querySelector(".modelSlider").offsetHeight * 0.5),
			scrub: 1,
			pin: true,
			// markers: true
		},
		y: 250,
		scale: 0.75,
		rotation: -15,
		opacity: 0,
		ease: "power3.out",
	});

	// second section starts from here
	let tl = gsap.timeline();
	gsap.fromTo(
		".modelSlider",
		{
			x: -40,
			scale: 0.3,
			// backgroundColor : "#525252",
			rotation: 85,
		},
		{
			scrollTrigger: {
				trigger: ".modelSlider",
				start: "top 200%",
				end: "top 50%",
				// markers: true,
				scrub: 1,
			},
			x: 0,
			scale: 1,
			backgroundColor : "#0e0e0c",
			rotation: 0,
			ease: "power3. out",
		}
	);

	gsap.from("#s-line1",{
		scrollTrigger: {
			trigger: ".heroSection",
			start: "90% 90%",
			end: "110% 100%",
			// markers: true,
			scrub: true
		},
		opacity: 0,
		width: "0%",
		duration: 2,
	});

	tl.from(".modelTitle",{
		scrollTrigger: {
			trigger: ".modelSlider",
			start: "top 40%",
			end: "80% 80%",
			// markers: true,
			scrub: true
		},
		opacity: 0,
		ease: "power1",
		y: 100,
		duration: 2,
	})

	.from(".slide-images",{
		opacity: 0,
		scale: 0.2,
		ease: "power1.out",
		duration: 1,
		scrollTrigger: {
			trigger: ".modelSlider",
			start: "top 40%",
			end: "30% 50%",
			scrub: true,
			// markers: true
		},
	})

	.from(".slide-titles",{
		scrollTrigger: {
			trigger: ".modelSlider",
			start: "top 30%",
			end: "30% 40%",
			scrub: true,
		},
		delay: 1,
		opacity: 0,
		ease: "power1.out",
		duration: 2,
	})

	gsap.to("#s-line1",{
		scrollTrigger: {
			trigger: ".modelSlider",
			start: "top 60%",
			end: "40% 40%",
			// markers: true,
			scrub: true
		},
		opacity: 1,
		width: "97%",
		duration: 5,
	});

	gsap.from("#s-line2",{
		scrollTrigger: {
			trigger: ".modelSlider",
			start: "90% 75%",
			end: "110% 85%",
			// markers: true,
			scrub: true
		},
		opacity: 0,
		width: "0%",
		duration: 5,
	});

	// third section starts from here
	tl.from(".thirdSection .sectionTitle",{
		scrollTrigger: {
			trigger: ".thirdSection",
			start: "top 40%",
			end: "80% 80%",
			// markers: true,
			scrub: true
		},
		opacity: 0,
		ease: "bounce",
		y: 100,
		duration: 2,
	})

	.from(".center",{
		scrollTrigger: {
			trigger: ".thirdSection",
			start: "top 20%",
			end: "50% 40%",
			// markers: true,
			scrub: true
		},
		opacity: 0,
		ease: "bounce",
		x: -100,
		duration: 2,
	})

	.from(".banner",{
		scrollTrigger: {
			trigger: ".thirdSection",
			start: "top 20%",
			end: "50% 40%",
			// markers: true,
			scrub: true
		},
		opacity: 0,
		ease: "bounce",
		x: 100,
		duration: 2,
	})

	.from(".overlay3", {
		scrollTrigger: {
			trigger: ".thirdSection",
			start: "top 10%",
			end: "40% 30%",
			// markers: true,
			scrub: true
		},
		opacity: 0,
		ease: "power1",
		y: 100,
		duration: 2,
	});

	gsap.from("#s-line3",{
		scrollTrigger: {
			trigger: ".thirdSection",
			start: "90% 70%",
			end: "110% 80%",
			// markers: true,
			scrub: true
		},
		opacity: 0,
		width: "0%",
		ease: "power1",
		duration: 5,
	});

	// fourth section starts from here
	gsap.from(".fourthSection", {
		scrollTrigger: {
			trigger: ".fourthSection",
			start: "top 60%",
			end: "top 0%",
			// markers: true,
			scrub: true
		},
		scale: 0.8,
		duration: 2,
		opacity: 0,
		ease: "power1",
	})

	const char = document.querySelector(".info h1");
	const text = new SplitType(char, {
		types: 'chars'
	});

	gsap.from(text.chars, {
		scrollTrigger: {
			trigger: char,
			start: "top 80%",
			end: "top 20%",
			scrub: true,
			// markers: true
		},
		opacity: 0.2,
		stagger: 0.1
	});

	gsap.from("#s-line6", {
		scrollTrigger: {
			trigger: "#s-line6",
			start: "top 90%",
			end: "top 70%",
			scrub: true,
			// markers: true
		},
		opacity: 0,
		width: "0%",
		ease: "power1",
		duration: 5,
	});

	// fifth section starts from here

}

scrollAnimation();

customCursor();

loadingAnimation();
video.pause();

smoothScroll();

afterLoadingAnimation();

progressScrollBar();

innerMenuAnimation();

heroSectionAnimation();

thirdSectionAnimation();

if (window.innerWidth < 768) {
	mobileThirdSectionAnimation();
	// console.log(window.innerWidth);
}

modelSlider();

textAnimation();

buttonAnimation();

fifthSection();


// javaScript for the devices whose width is equal to 768px or less

let responsiveJs = () => {
	function modelSlider() {
		let currentIndex = 1;
		let totalSlides = 9;

		const updateActiveSlides = () => {
			document.querySelectorAll(".title").forEach((el, index) => {
				if (index === currentIndex) {
					el.classList.add("active");
				} else {
					el.classList.remove("active");
				}
			});
		};

		const handleSlider = () => {
			if (currentIndex < totalSlides) {
				currentIndex++;
			} else {
				currentIndex = 1;
			}

			gsap.to(".slide-titles", {
				onStart: () => {
					setTimeout(() => {
						updateActiveSlides();
					}, 100);

					if (currentIndex + 1 < 10) {
						updateImages(currentIndex + 1);
					} else {
						updateImages(1);
					}
				},
				x: `-${(currentIndex - 1) * 10.49}%`,
				duration: 2,
				ease: "power4.out",
			});
		};

		const updateImages = (imgNumber) => {
			let imgSrc = `./assets/images/models/car${imgNumber}-.jpg`;
			const image = document.createElement("img");
			// const imgBottom = document.createElement("img");

			image.src = imgSrc;
			// imgBottom.src = imgSrc;

			document.querySelector(".mobileSlideImages").appendChild(image);
			// document.querySelector(".img-bottom").appendChild(imgBottom);

			gsap.from([image], {
				opacity: 0,
				transform: "translateX(-100px)",
				duration: 1,
				ease: "power4.out",
				onComplete: trimExcessImages,
			});
		};

		const trimExcessImages = () => {
			const container = document.querySelector(".mobileSlideImages");
			const images = Array.from(container.querySelectorAll("img"));
			const excessCount = images.length - 1;

			if (excessCount > 0) {
				images
					.slice(0, excessCount)
					.forEach((image) => container.removeChild(image));
			}
		};

		document.addEventListener("DOMContentLoaded", () => {
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

			document.querySelector(".modelSlider").addEventListener("click", () => {
				clearInterval(intervalId);

				handleSlider();

				resetInterval();
			});
		});
	}

	function handleResize() {
		const mediaQuery = window.matchMedia("(max-width: 768px)");

		if (mediaQuery.matches) {
			// Screen width is less than or equal to 768px
			modelSlider();
		}
	}

	handleResize();
	window.addEventListener("resize", handleResize);
};

responsiveJs();

// footer
function scrollToTop() {
	window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelector(".contact-link").addEventListener("click", (e)=>{
	e.preventDefault();
	document.querySelector(".footer-wrapper").scrollIntoView({ behavior: "smooth" });
});