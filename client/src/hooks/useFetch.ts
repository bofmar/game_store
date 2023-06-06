import { useEffect, useState } from "react";

interface IReturnType<T> {
	data: T | null;
	loading: boolean;
	error: string | null;
}

export default function useFetch<T>(url: string): IReturnType<T> {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const abort = new AbortController();

		async function getData() {
			try {
				const response = await fetch(url, { signal: abort.signal} );
				const resData = await response.json();
				setData(resData);
			} catch(err: unknown) {
				if(typeof err === 'string') {
					setError(err.toUpperCase);
				}else if(err instanceof Error) {
					setError(err.message);
				}
			} finally {
				setLoading(false);
			}
		}
		getData();

		return () => {
			abort.abort();
		}
	},[url]);	

	return { data, loading, error }
}
