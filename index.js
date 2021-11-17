#!/usr/bin/env node
const { program } = require('commander');
const { createHash } = require('crypto');

const BASE_API_URL = 'https://api.pwnedpasswords.com/range';

program
	.version('1.0.0')
	.description('Check if your password has been pwned')
	.argument('[password]', 'password you want to check')
	.action(async password => {
		if (!password) password = await require('async-prompt').password('Enter a password: ');
		checkPassword(password);
	})
	.parse();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

function checkPassword(password) {
	const hash = createHash('sha1').update(password).digest('hex').toUpperCase();
	fetch(`${BASE_API_URL}/${hash.slice(0, 5)}`)
		.then(res => res.text())
		.then(text => {
			const hashes = text.split(/\r?\n/).map(e => ({ hash: e.split(':')[0], count: parseInt(e.split(':')[1]) }));
			if (hashes.map(e => e.hash).includes(hash.slice(5))) {
				console.log('Oh no, pwned!');
				console.log(`This password has previously appeared in data breaches ${hashes.find(e => e.hash == hash.slice(5)).count} times and should never be used!`);
			} else {
				console.log('No worries, your password has not been pwned');
			}
		});
}
