var captchapng = require('captchapng');
function generateBase64(options) {
	var height = options.height || 20, text = '' + options.text, width = options.width || height * text.length;
	var p = new captchapng(width, height, text);
	p.color.apply(p, options.background || [0, 0, 0, 0]);
	p.color.apply(p, options.color || [Math.random() * 255 | 0, Math.random() * 255 | 0, Math.random() * 255 | 0, 255]);

	return p.getBase64();
}

module.exports = {
	create:function(res , options){
		res.writeHead(200, {
			'Content-Type': 'image/png'
		});
		res.end(new Buffer(generateBase64(options), 'base64'));
	}
};