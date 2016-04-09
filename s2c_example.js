var SecureKey 	= 'secure key here';
var macaddr 	= 'macaddr here';

var battery 	= Math.round(Math.random()*10000)/100;
var current 	= Math.round(Math.random()*10000)/100;
var distance 	= Math.round(Math.random()*10000)/100;
var pressure 	= Math.round(Math.random()*10000)/100;
var voltage 	= Math.round(Math.random()*10000)/100;

var gateway = {"macaddr":macaddr,"api_version":"1.0.1","uptime":"0","sensorList":[{"id":"1","name":"sensor0","channels":[{"name":"battery","value":battery,"unit":"","time":"1970-01-01T00:11:14"},{"name":"current","value":current,"unit":"","time":"1970-01-01T00:11:14"},{"name":"distance","value":distance,"unit":"","time":"1970-01-01T00:11:14"}]},{"id":"2","name":"sensor1","channels":[{"name":"pressure","value":pressure,"unit":"","time":"1970-01-01T00:11:14"},{"name":"voltage","value":voltage,"unit":"","time":"1970-01-01T00:11:14"}]}]}

var data = JSON.stringify(gateway);

S2CPOST(data,macaddr,SecureKey,post_callback)

function S2CPOST(data,macaddr,SecureKey,post_callback)
	{
		var http = require("http");
		console.log('data = '+data);
		var options = 
		{
			hostname: 'developer.sensors2cloud.com',
			port: 80,
			path: '/arduino',
			method: 'POST',
			headers: {'Content-Type': 'application/json','Content-Length': data.length,'macaddr':macaddr,'securekey':SecureKey}
		};
		var req = http.request(options, function(res)
			{
				res.setEncoding('utf8');  
				res.on('data', function (body) { post_callback(body); }); 
			});
		req.on('error', function(e)            { post_callback(e.message); });
		// write data to request body
		req.write(data);
		req.end();
	}
	
function post_callback(resp)
	{
		console.log('POST response  '+resp);
	}
