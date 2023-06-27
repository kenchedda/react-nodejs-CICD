import axios from 'axios';

export default axios.create({
	baseURL: 'http://dev-gateway.edshopper.com:80',
});
