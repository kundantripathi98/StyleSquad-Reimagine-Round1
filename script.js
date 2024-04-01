let loaderNum = document.querySelector(".loaderNum");
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
updateLoading();

gsap.to(".loaderNum", {
	delay: 3.2,
	opacity: 0,
});

gsap.to(".dark1 p", {
	opacity: 0,
	duration: 0.4,
	ease: Power4,
	yoyo: true,
	repeat: 6,
});

gsap.from("#loaderImage", {
	opacity: 0,
	duration: 0.9,
	ease: Power4,
	yoyo: true,
	repeat: 3,
});

gsap.to(".box", 1.5, {
	delay: 3,
	height: 0,
	stagger: {
		amount: 0.5,
	},
	ease: "power4.Out",
});

gsap.to(".loader", {
	delay: 5,
	y: "-=100%",
});

document.addEventListener("DOMContentLoaded", () => {
	const menu = document.querySelector(".menu");
	const toggleBtn = document.querySelector(".toggle");
	const closeBtn = document.querySelector(".closeBtn");
	let isOpen = false;

	const timeline = gsap.timeline({ paused: true });

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

	toggleBtn.addEventListener("click", () => {
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
});

// Rolling Text Effect

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
