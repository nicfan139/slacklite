# Slacklite client

Front-end built using Next 13 + TypeScript + GraphQL

## Installation

1. Clone the top-level `slacklite` repo to your local machine
2. Navigate to the `/client` directory
3. Run `nvm use` to use this project's version of node, then run install dependencies using `npm install`
4. Create `.env.local` file with the following environment variables:
```
  NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000
```
5. Start the client using `npm run dev` (ensure the server is running before doing this)