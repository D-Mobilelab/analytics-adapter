# analytics-adapter

[![Build Status](https://travis-ci.org/D-Mobilelab/analytics-adapter.svg?branch=master)](https://travis-ci.org/D-Mobilelab/analytics-adapter)
[![Coverage Status](https://coveralls.io/repos/github/D-Mobilelab/analytics-adapter/badge.svg)](https://coveralls.io/github/D-Mobilelab/analytics-adapter)
[![npm version](https://badge.fury.io/js/analytics-adapter.svg)](https://badge.fury.io/js/analytics-adapter)
[![Greenkeeper badge](https://badges.greenkeeper.io/D-Mobilelab/analytics-adapter.svg)](https://greenkeeper.io/)

analytics-adapter is a interface for Google Analytics to tracking events, pageviews and custom dimensions

## Usage
```html
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
/* DON'T USE 
	ga('create', 'UA-40538478-2', 'auto');
Analytics-Adapter can initialize it for you if you pass analyticsID to init(), see below */
</script>
```

```javascript
// init Analytics and set 'User' custom dim to slot #3 and 'Valuable' to slot #4
AnalyticsAdapter.init({
	enabled: true,
	/* if you pass analyticsID, analytics-adapter call ga('create') for you */
	analyticsID: 'UA-123456789-1',
	logger: console,
	dimensions: {
		User: 3,
		Valuable: 4
	}
});

// set 'User' custom dim, without re-specify the slot
AnalyticsAdapter.setDimension({
	User: 'logged'
});

// track pageview
AnalyticsAdapter.trackPage({
	page: '/home',
	title: 'Home Page',
	dimensions: {
		Valuable: false
	}
});

// track event
AnalyticsAdapter.trackEvent({
	category: 'Social',
	action: 'Click',
	label: 'Facebook',
	value: 3,
	dimensions: {
		Valuable: true
	}
});
```

## Installation

### NPM
```bash
npm install --save analytics-adapter
```

## Documentation

To read documentation, go to:

[http://d-mobilelab.github.io/analytics-adapter/latest](http://d-mobilelab.github.io/analytics-adapter/latest)

or for a previous version of the documentation, go to:

[http://d-mobilelab.github.io/analytics-adapter/3.0.0](http://d-mobilelab.github.io/analytics-adapter/3.0.0)

replace *3.0.0* with previous version.

