import { useEffect, useState } from "react";
interface APIMessage {
	message: string
}

export default function ConTest() {
	const [message, setMessage] = useState<APIMessage | null>(null);

	useEffect(() => {
		async function getData() {
			const response = await fetch('http://localhost:5000/');
			const data = await response.json();

			setMessage(data);
		}
		getData();
	},[]);	
	
	return (
		<>
			{message && message.message}
		</>
	);
}
