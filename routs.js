const fs = require('fs');
const { text } = require('stream/consumers');

const requestHandler = (req, res) => {
    // console.log(req.url, req.method, req.headers);
    // process.exit(); //This will stop the server from running
    const url = req.url;
    const method = req.method;
    //routing the request
    if(url === '/'){
        //send response to the client
        //res.setHeader() does not send immedietly to the client, it just sets the header. The headers are sent when res.end() is called.
        //res.writeHead(200, { ... }) sets the status code and headers at the same time.
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/message" method="POST"> <input type = "text" name="message"><button type = "submit">send</button> </form></body>');
        res.write('</html>');
        //send response back to the client and end the response so that the client knows that the response is complete after that page will show up on browser
        return res.end();
    } 
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            //parsing the request body
            const parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.end();
                    return;
                }
                //redirecting the user to the home page
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    } else {
        res.setHeader('content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>Hello !</h1></body>');
        res.write('</html>');
        res.end(); //send back to the client
    }
}

//there are different ways to export the function

// module.exports = requestHandler; 

module.exports = {
    handler: requestHandler,
    text: 'some text is here'
};

// module.exports.handler = requestHandler;
// module.exports.text = 'some text is here';