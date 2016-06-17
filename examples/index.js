AnalyticsAdapter.init({
	enabled: true,
	verbose: true,
	logger: console,
	dimensions: {
		'UserStatus': 1,		// Session
		'AccessType': 2,		// User
		'Valuable': 5,			// Hit
		'Action': 8,			// Hit
		'PaymentType': 11		// User
	}
});

AnalyticsAdapter.setId(123456789);

AnalyticsAdapter.trackPage({
	page: '/homepage',
	title: 'Home Page',
	dimensions: {
		'Valuable': 'yes',
		'Action': 'no'
	}
});

AnalyticsAdapter.setDimension({
	'UserStatus': 'logged',
	'AccessType': 'premium',
	'PaymentType': 'gwallet'
});

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