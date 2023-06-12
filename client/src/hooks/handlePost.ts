import { toast } from "react-toastify";
import { IConsole, IGenre, IPublisher } from "../types/types";

type TFormData = IGenre | IPublisher | IConsole | FormData;

export const handlePost = async (url: string, formData: TFormData) => {
	const loadToast = toast.loading('Please wait...');
	const delay = 2000;

	const response = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		// Do not set a header if we are sending a game
		headers: formData instanceof FormData ? {} : { 'Content-Type': 'application/json',},
		body: formData instanceof FormData ? formData : JSON.stringify(formData),
	});
	if(response.status === 400){ // The genre already exists
		toast.update(loadToast, { render: `${ formData instanceof FormData ? formData.get('title') : formData.name } already exists in the database`, type: 'warning', isLoading: false, autoClose: delay });
	} else if(response.status === 201) { // The genre was created successfully
		toast.update(loadToast, { render: `${ formData instanceof FormData ? formData.get('title') : formData.name } was created`, type: 'success', isLoading: false, autoClose: delay});
		setTimeout(() => window.location.reload(), delay);
	} else { // something went wrong
		toast.update(loadToast, { render: 'Something went wrong. Please try again later', type: 'error', isLoading: false, autoClose: delay});
	}
}
