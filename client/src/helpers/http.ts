export const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export const USER_ACCESS_TOKEN =
	typeof window !== 'undefined' ? localStorage.getItem('slacklite-userAccessToken') : null;

export const getAuthContext = () => ({
	headers: {
		Authorization: `Bearer ${USER_ACCESS_TOKEN}`
	}
});

interface IFetchProps {
	route: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	payload?: any;
}

export const normalFetch = ({ route, method, payload }: IFetchProps) =>
	fetch(BACKEND_API_URL + '/api' + route, {
		method,
		headers: {
			'Content-type': 'application/json'
		},
		...(payload && {
			body: JSON.stringify(payload)
		})
	});
