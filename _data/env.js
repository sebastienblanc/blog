/**
	Setup environment variables
*/

const BUILD_ENV = process.env.CONTEXT || process.env.BUILD_ENV || 'development';

module.exports = {
	BUILD_ENV,
	BASE_URL: (BUILD_ENV !== 'production' ? process.env.DEPLOY_URL : process.env.URL) || process.env.BASE_URL || '',
}