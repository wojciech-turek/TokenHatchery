## Info

This project is written to allow non-technical people or non-devs like artists, project manager, project owners etc. to easily create, customize, deploy and verify tokens with standards like ERC20, ERC721, ERC1155. Contracts can be created with multiple extensions like mintable, burnable, votes, snapshots and more. Contracts will support having the control type to either be Single Owner or have Role Base Access. In the future I plan on adding more types like gas optimized ERC721A, 1155D or others based on community suggestions.

The app will also allow owners to manage their tokens through the app, call their function and see statistics. (not ready yet)

This project will always be **opensource** and **free of cost** for people who want to deploy their tokens, the only fee will be the gas which depends on chosen network.

Smart contracts used for token deployment are created with use of [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) which I find to be very high quality, they are also audited so we can assume relatively safe to use. I have not added any custom code which could break their security.

This project has a live deployment which is currently under development (unstable) available at: [https://token-hatchery.vercel.app/](https://token-hatchery.vercel.app/)

## Running the project locally

Update `.env.example` with your API keys, and MongoDB connection string and rename it to `.env.local`

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Contracts you deploy will go into `tmp` folder, if you want them to be saved locally on your maching make sure to change it to `./tmp...` from `/tmp...`.
One works locally but not on the server and vv.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Sections

This app will not

## Contributions and suggestions

Participation is more than welcome, be it in form of an issue report, code review or pull request with an explanation of what and why.
People who contribute significantly will make it to the list as contributors on a about page, which does not exist yet.

I will also be forevergrateful ❤️

Urgent needs

- Code review
- Improvements
- Better design
