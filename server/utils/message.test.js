var expect = require('expect');

var {generateMessage} = require('./message');


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