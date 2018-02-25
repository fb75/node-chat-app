var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');


describe('generateMessage', () => {
	it('should generate the correct message object', () => {
		const res = generateMessage('Francesco', 'Hi there!');

		// from expect v.21
		expect(res).toMatchObject({
			from: 'Francesco',
			text: 'Hi there!'
		});

		expect(typeof res.createdAt).toBe('number');
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		const from = 'Francesco';
		const latitude = 15;
		const longitude = 19;
		const url = "https://www.google.com/maps?=15,19";
		const message = generateLocationMessage(from, latitude, longitude);

		expect(typeof message.createdAt).toBe('number');
    expect(message).toInclude({from, url});
	});
});