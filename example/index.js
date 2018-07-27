import AnalyticsAdapter from '../src/index.js';

/* INIT */
AnalyticsAdapter.init({
	enabled: true,
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