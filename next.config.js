module.exports = {
	compiler: {
		styledComponents: true,
	},
	env: {
		PGHOST: process.env.PGHOST,
		PGUSER: process.env.PGUSER,
		PGPASSWORD: process.env.PGPASSWORD,
		PGDATABASE: process.env.PGDATABASE,
		PGPORT: process.env.PGPORT,
		GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
		GITHUB_REDIRECT_URL: process.env.GITHUB_REDIRECT_URL,
		AUTH0_API_URL: process.env.AUTH0_API_URL,
		AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
		AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
		AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
		BASEURL: process.env.BASEURL,
	},
};
