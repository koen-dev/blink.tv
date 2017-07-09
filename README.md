# blink.tv

## Installation
It's as simple as running `npm install`.

## Scripts
`npm start`  
Only used in production. Make sure all the right environment variables are set
on the target machine/server.

`npm run build`  
Runs webpack with the production flag. Outputs the result in `./app/dist/`

`npm run dev:start`  
Use this to run blink.tv in development. Uses Foreman to load a `.env` file with
all the environment variables specified.  
Example `.env` file:
```
TWITCH_CLIENT_ID=yourclientidfromtwitch
TWITCH_CLIENT_SECRET=extremelysecretkeyfortwitch
MONGODB_URL=mongodb://user:pass@localhost:49132/dbname
TWITCH_CALLBACK_URL=http://localhost:3000/auth/twitch/callback
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details
