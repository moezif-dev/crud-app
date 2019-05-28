const httpReq = function(){
	this.http = new XMLHttpRequest();
}

httpReq.prototype.get = function(url, callback){
	const self = this;
	self.http.open('GET', url, true);

	self.http.onreadystatechange = () => {
		const { readyState, status, responseText = '' } = self.http;
		/*
			0: request not initalized.
			1: Server connection established.
			2: request is received.
			3: processing request.
			4: request finished and response is ready
		*/
		switch(readyState){
			case 4: {
				if(status === 200){
					const users = JSON.parse( responseText );
					callback(null, users);
				} else {
					callback(`Error: ${self.http.status}`);
				}
			}
		}
	};

	self.http.send();
}

httpReq.prototype.post = function(url, data, callback){
	const self = this;
	self.http.open('POST', url, true);
	self.http.setRequestHeader('Content-type', 'application/json');

	self.http.onreadystatechange = () => {
		const { readyState, status, responseText = '' } = self.http;
		/*
			0: request not initalized.
			1: Server connection established.
			2: request is received.
			3: processing request.
			4: request finished and response is ready
		*/
		switch(readyState){
			case 4: {
				if(status === 200){
					const user = JSON.parse( responseText );
					callback(null, user);
				} else {
					callback(`Error: ${self.http.status}`);
				}
			}
		}
	};

	self.http.send( JSON.stringify(data) );
}

httpReq.prototype.delete = function(url, callback){
	const self = this;
	self.http.open('DELETE', url, true);

	self.http.onreadystatechange = () => {
		const { readyState, status, responseText = '' } = self.http;
		/*
			0: request not initalized.
			1: Server connection established.
			2: request is received.
			3: processing request.
			4: request finished and response is ready
		*/
		switch(readyState){
			case 4: {
				if(status === 200){
					callback(null, 'User is deleted');
				} else {
					callback(`Error: ${self.http.status}`);
				}
			}
		}
	};

	self.http.send();
}

export default httpReq;