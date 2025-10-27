const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const app = next({ dev: false });
const handle = app.getRequestHandler();

let server;

const startServer = async () => {
  if (!server) {
    await app.prepare();
    server = createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });
  }
  return server;
};

exports.handler = async (event, context) => {
  const server = await startServer();
  
  return new Promise((resolve, reject) => {
    const { headers = {}, body, httpMethod, path, queryString } = event;
    
    // 构建请求 URL
    let url = path || '/';
    if (queryString) {
      url += '?' + queryString;
    }
    
    // 创建模拟的 request 和 response 对象
    const req = {
      method: httpMethod || 'GET',
      url: url,
      headers: headers,
      body: body
    };
    
    const res = {
      statusCode: 200,
      headers: {},
      body: '',
      setHeader: function(name, value) {
        this.headers[name] = value;
      },
      writeHead: function(statusCode, headers) {
        this.statusCode = statusCode;
        if (headers) {
          Object.assign(this.headers, headers);
        }
      },
      write: function(chunk) {
        this.body += chunk;
      },
      end: function(chunk) {
        if (chunk) {
          this.body += chunk;
        }
        resolve({
          statusCode: this.statusCode,
          headers: this.headers,
          body: this.body
        });
      }
    };
    
    server.emit('request', req, res);
  });
};