import Upload from "./Upload";

export default class HomeView {
	#btnMenu = document.getElementById("menu-btn");
	#menu = document.getElementById("menu");
	#fileInput = document.getElementById("fileInput");
	#sentFilesStatus = document.getElementById("sent-files--status");
	#uploadProgressContainer = document.getElementById(
		"upload-progress--container"
	);

	constructor() {
		this.configureMenuRigthButton();
		this.configureOnChangeFile();
	}

	configureMenuRigthButton() {
		this.#btnMenu.addEventListener("click", () => {
			const currentDisplay = window.getComputedStyle(this.#menu, null).display;
			this.#menu.style.display = currentDisplay == "none" ? "flex" : "none";
		});
	}

	configureOnChangeFile() {
		this.#fileInput.addEventListener("change", () => {
			const file = this.#fileInput.files[0];
			if (file == null) {
				return alert("No file selected.");
			}

			new Upload(file).uploadFile();
		});
	}

	updateSentFileStatus(fileName, currentStatus) {
		this.#uploadProgressContainer.style.display = "flex";
		this.#sentFilesStatus.innerHTML = `
		<li id="${fileName}" class="file-sending">   
	   	<span class="filename">${fileName}</span>
      <span class="current-status">${currentStatus}</span
    </li>`;
	}
}
