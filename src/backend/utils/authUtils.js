import { Response } from 'miragejs';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
const REACT_APP_JWT_SECRET = 'WFFWf15115U842UGUBWF81EE858UYBY51BGBJ5E51Q';

export const requiresAuth = function (request) {
	const encodedToken = request.requestHeaders.authorization;

	const decodedToken = jwt_decode(encodedToken, REACT_APP_JWT_SECRET);

	if (decodedToken) {
		const user = this.db.users.findBy({ email: decodedToken.email });
		if (user) {
			return user._id;
		}
	}

	return new Response(
		401,
		{},
		{ errors: ['The token is invalid. Unauthorized access error.'] }
	);
};

export const formatDate = () => dayjs().format('YYYY-MM-DD HH:mm:ssZ');
