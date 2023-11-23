const token_API = import.meta.env.VITE_TOKEN_API;
const options_API =
	{
		headers: {
			'Authorization': `Bearer ${token_API}`
		}
	}
export default options_API;
