import HomeView from "./HomeView";
import axios from "axios";

export default class Upload {
	constructor(file) {
		this.file = file;
	}

	getSignedRequest() {
		const treatedFileName = encodeURIComponent(this.file.name);
		return axios
			.get(`/sign-s3?file_name=${treatedFileName}`)
			.then(response => {
				return response.data;
			})
			.catch(e => {
				console.log(e);
				alert("Erro no upload");
			});
	}

	uploadFile() {
		new HomeView().updateSentFileStatus(this.file.name, "Aguarde...");
		this.getSignedRequest().then(data => {
			const formData = new FormData();
			formData.append("file", this.file);
			axios
				.put(data.signedUrl, formData)
				.then(response => {
					new HomeView().updateSentFileStatus(this.file.name, "Concluído");
				})
				.catch(e => {
					console.log(e);
					new HomeView().updateSentFileStatus(
						this.file.name,
						"Tente novamente"
					);
				});
		});
	}
}
