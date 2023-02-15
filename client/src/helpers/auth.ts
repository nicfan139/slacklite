export const handleLogout = () => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('slacklite-userAccessToken');
		window.location.href = '/login';
	}
};
