import { toast } from "react-toastify";

export const handleDelete = async (url: string, name: string) => {
	const loadToast = toast.loading('Please wait...');
	const delay = 2000;

	const response = await fetch(url, {
		method: 'POST',
		mode: 'cors',
	});
	if(response.status === 201) { // The genre was created successfully
		toast.update(loadToast, { render: `${name} was deleted`, type: 'success', isLoading: false, autoClose: delay});
		setTimeout(() => window.location.reload(), delay);
	} else if(response.status === 404) { // The item was not found
		toast.update(loadToast, { render: `${name} does not exist in the database.`, type: 'error', isLoading: false, autoClose: delay});
	} else { // something went wrong
		toast.update(loadToast, { render: 'Something went wrong. Please try again later', type: 'error', isLoading: false, autoClose: delay});
	}
}
