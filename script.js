// const loaderNumAnimation = ()=>{
//     let i = 0;
//       if (i == 0) {
//         i = 1;
//         let loaderNum = document.querySelector('.loaderNum');
//         let num = 1;
//         let id = setInterval(()=>{
//             if (num >= 100) {
//               clearInterval(id);
//               i = 0;
//             }
//             else{
//               num++;
//               loaderNum.innerHTML = num + "%";
//             }
//           }, 15);
//       }

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
// }

// loaderNumAnimation();

// function loaderAnimation() {

// }
// loaderAnimation();

gsap.to(".loaderNum",{
	delay: 3.2,
	opacity: 0,
});

gsap.from("#loaderImage",{
    opacity: 0,
    duration: 0.9,
    ease: Power4,
    yoyo: true,
    repeat: 3
});


gsap.to(".box", 1.5, {
	delay: 3,
	height: 0,
	stagger: {
		amount: 0.8,
	},
	ease: "power4.Out",
});

gsap.to(".loader", {
    delay: 4.9,
    zIndex: -1
});