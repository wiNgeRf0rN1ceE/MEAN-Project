"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var debug = require("debug");
var server_1 = require("../server");
debug('ts-express:server');
var port = normalizePort(process.env.PORT || 3000);
server_1.default.set('port', port);
var server = http.createServer(server_1.default);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    var port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else
        return false;
}
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;
    var bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = (typeof addr === 'string') ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3d3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc2VydmVyL2Jpbi93d3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQkFBNkI7QUFDN0IsNkJBQStCO0FBQy9CLG9DQUE0QjtBQUU1QixLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUUzQixJQUFNLElBQUksR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUM7QUFFckQsZ0JBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRXRCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQUcsQ0FBQyxDQUFDO0FBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDNUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFFcEMsdUJBQXVCLEdBQW9CO0lBQzFDLElBQUksSUFBSSxHQUFXLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDdkUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUM1QixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEMsSUFBSTtRQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDbkIsQ0FBQztBQUVELGlCQUFpQixLQUE0QjtJQUM1QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQztRQUFDLE1BQU0sS0FBSyxDQUFDO0lBQzVDLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLEdBQUcsT0FBTyxHQUFHLElBQUksR0FBRSxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3RFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLEtBQUssUUFBUTtZQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUksSUFBSSxrQ0FBK0IsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsS0FBSyxDQUFDO1FBQ1AsS0FBSyxZQUFZO1lBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUksSUFBSSx1QkFBb0IsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsS0FBSyxDQUFDO1FBQ1A7WUFDQyxNQUFNLEtBQUssQ0FBQztJQUNkLENBQUM7QUFDRixDQUFDO0FBRUQ7SUFDQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsR0FBRyxVQUFRLElBQU0sR0FBRyxVQUFRLElBQUksQ0FBQyxJQUFNLENBQUM7SUFDN0UsS0FBSyxDQUFDLGtCQUFnQixJQUFNLENBQUMsQ0FBQztBQUMvQixDQUFDIn0=