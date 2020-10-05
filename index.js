document.addEventListener('DOMContentLoaded', function(event) {

	const checkPageButton = document.querySelector( "#action-enable");

	checkPageButton.addEventListener('click', function () {

		const isActive = checkPageButton.classList.contains("active") ? 0 : 1;


		chrome.tabs.executeScript({
				code: `(${main})(${JSON.stringify({result: isActive})})`
			}, ([result] = []) => {
				console.log("result came ", result)
			});
		if (isActive) {
			checkPageButton.classList.add("active");
		}
		else {
			checkPageButton.classList.remove("active");
		}
	}, false);

	function main(value) {
		const videoPlayer = document.querySelector(".video-stream, .html5-main-video");
		if (!videoPlayer) {
			return;
		}

		function sleep (time) {
			return new Promise((resolve) => setTimeout(resolve, time));
		}

		function eventListener(w) {
			if (!w) return;
			sleep(200)

			const canc = document.querySelector(".ytp-upnext-cancel-button[tabindex='0']");
			if (canc) {
				canc.click()
			}
			else console.log("canc not found")
			sleep(200)
			const b1 = document.querySelector("[title='Replay']");
			if (b1) {
				b1.click()
			}
			else {
				console.log("b1 not found");
			}
			sleep(200)
			const b2 = document.querySelector("[title='Play (k)']");
			if (b2) {
				b2.click()
			}
		}

		if(value.result) {

			videoPlayer.addEventListener("ended", eventListener);
			console.log("ADD EVENT LISTENER");
		}
		else {
			window.location.reload();
		}

		return {
			result: 1
		}
	}
});

