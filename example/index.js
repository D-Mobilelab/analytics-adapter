import AnalyticsAdapter from '../src/index.js';

/* CUSTOM WINDOW.GA */
const windowGA = (...args) => {
	console.warn('window.ga calls with:', args);
}

/* INIT */
AnalyticsAdapter.init({
	ga: windowGA,
	enabled: true,
	analyticsID: 'UA-40538478-2',
	logger: console,
	dimensions: {
		'UserStatus': 1,		// Session
		'AccessType': 2,		// User
		'Valuable': 5,			// Hit
		'Action': 8,			// Hit
		'PaymentType': 11		// User
	}
});

/* SET USER ID */
AnalyticsAdapter.setId(123456789);

/* TRACK PAGEVIEW */
AnalyticsAdapter.trackPage({
	page: '/homepage',
	title: 'Home Page',
	dimensions: {
		'Valuable': 'yes',
		'Action': 'no'
	}
});

/* SET DIMENSION */
AnalyticsAdapter.setDimension({
	'UserStatus': 'logged',
	'AccessType': 'premium',
	'PaymentType': 'gwallet'
});

/* TRACK EVENT */
AnalyticsAdapter.trackEvent({
	category: 'Categoria',
	action: 'Azione',
	label: 'Etichetta',
	value: 6,
	dimensions: {
		'Valuable': 'yes',
		'Action': 'yes'
	}
});