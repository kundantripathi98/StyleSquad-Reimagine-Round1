// function loaderAnimation() {
// 	let loadingElement = document.querySelector(".loading");
// 	let current = 0;

// 	function updateLoading() {
// 		if (current === 100) {
// 			return;
// 		}

// 		current += Math.floor(Math.random() * 10) + 1;

// 		if (current > 100) {
// 			current = 100;
// 		}

// 		loadingElement.textContent = current + "%";
// 		let delay = Math.floor(Math.random() * 200) + 50;
// 		setTimeout(updateLoading, delay);
// 	}
// 	updateLoading();
// }
// loaderAnimation();

// gsap.to(".loading", 0.25, {
// 	// delay: 3.5,
// 	opacity: 0,
// });

gsap.to(".box", 1.5, {
	// delay: 3.5,
	height: 0,
	stagger: {
		amount: 0.9,
	},
	ease: "power4.Out",
});
