# Repro for tar-stream header issue

Re: <https://github.com/mafintosh/tar-stream/issues/44>

1. Ensure docker is running, with proper shell environment
1. clone repo
1. run `cd node-tar-dockerode-repo`
1. run `npm install` # Install dependencies
1. run `node test-dockerode.js` # This should complete successfully without any errors...
1. run `sudo chgrp -R 0 .` # Change files to use GID "0" ("wheel" on my system)
1. run `node test-dockerode.js`

After last step, the output contains:
```
tar-fs { [Error: HTTP code is 500 which indicates error: server error - archive/tar: invalid tar header
] reason: 'server error', statusCode: 500, json: null }
```

Where the "tar and fstream" implementation was successful.

```
$ node test-dockerode.js
{ socketPath: false,
  host: '172.23.0.100',
  port: '2376',
  protocol: 'https' }
Using tar and fstream...
Using tar-fs (and tar-stream)...
tar-fs { [Error: HTTP code is 500 which indicates error: server error - archive/tar: invalid tar header
] reason: 'server error', statusCode: 500, json: null }
{"stream":"Step 1 : FROM node:0.10-slim\n"}
{"stream":" ---\u003e d69349794ebf\n"}
{"stream":"Step 2 : EXPOSE 8626\n"}
{"stream":" ---\u003e Using cache\n"}
{"stream":" ---\u003e 5a4c49fa3032\n"}
{"stream":"Step 3 : WORKDIR /app\n"}
{"stream":" ---\u003e Using cache\n"}
{"stream":" ---\u003e 21db157e8870\n"}
{"stream":"Step 4 : ENV NODE_ENV production\n"}
{"stream":" ---\u003e Using cache\n"}
{"stream":" ---\u003e 967486c7c0de\n"}
{"stream":"Step 5 : CMD node test-tarfile.js\n"}
{"stream":" ---\u003e Using cache\n"}
{"stream":" ---\u003e 50b674018d26\n"}
{"stream":"Step 6 : COPY package.json /app/\n"}
{"stream":" ---\u003e Using cache\n"}
{"stream":" ---\u003e bdb60a892177\n"}
{"stream":"Step 7 : RUN npm install\n"}
{"stream":" ---\u003e Using cache\n"}
{"stream":" ---\u003e 684364df550e\n"}
{"stream":"Step 8 : COPY . /app\n"}
{"stream":" ---\u003e 811aad1ef1a2\n"}
{"stream":"Removing intermediate container 672d4172508d\n"}
{"stream":"Successfully built 811aad1ef1a2\n"}
```