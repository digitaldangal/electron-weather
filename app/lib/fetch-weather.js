import axios from 'axios'

export default ({ lat, lng }, weatherApiKey, preferredUnits: string = 'us') =>
	axios
		.get(
			`https://api.darksky.net/forecast/${weatherApiKey}/${lat},${lng}?units=${preferredUnits}`
		)
		.then(res => res.data)
