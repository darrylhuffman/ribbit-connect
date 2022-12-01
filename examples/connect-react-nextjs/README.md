This is the RIBBIT CONNECT [Next.js](https://nextjs.org/) demo project. This demo is a server and client-side application, the client requests a new CONNECT widget session with the info you provide in a form. The API submits the request to the RIBBIT API servers and redirects you to a page where you can see the resulting CONNECT widget. 

## Getting Started

First, run an install of the package:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


The [API route](https://nextjs.org/docs/api-routes/introduction) that submits the RIBBIT Get CONNECT session request can be accessed at [http://localhost:3000/api/getToken](http://localhost:3000/api/getToken). This endpoint can be edited in `pages/api/getToken.js`.
