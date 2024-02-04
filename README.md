# Crossmint Mint Frame

## Overview

Web App that allows you to create a recast-then-mint frame for Farcaster. Use this to promote
your posts and allow your followers to own a piece of them.

This app is built with Vercel edge functions using NextJS 13, Crossmint for NFT minting, and
Farcaster as the distribution channel.

## Project set up

Clone this repo and install dependencies.

```bash
git clone git@github.com:Crossmint/frame-minter.git
cd frame-minter
yarn
```

Create a Crossmint project and obtain an API key:

1. Go to www.crossmint.com/console and sign up (if you're testing on testnets, use staging.crossmint.com/console
   instead)
2. Navigate to the Billing and Usage tab and top up credits (this only applies if you're in production). Credits are
   used to pay for minting fees.
3. Finally, go to Api Keys, create a new Server Side Key, and give it the `nfts.create` and `nfts.read` scopes. Save this key for later.

Create an NFT collection from the Collections tab in the console. Once created, tap to Create
an NFT, and fill in the details. Set the supply to unlimited.

Copy the template ID of the NFT. // TODO: this doesnt work in the UI and needs calling the API

Edit `const.ts` and fill in the values

## TODO

- Vercel button
- Add upstash
- Use env vars

V2 items:

- Multiple claims per server
- Dynamic metadata
- Dynamic recipient
- Open editions
  - Time based editions
- Customizable claim conditions (following, num of followers, etc)

## Learn more

### About Crossmint

Crossmint is a platform for creating, custodying and selling NFTs, using easy to use REST APIs. It works with 15+ chains
and is designed to be easy to use, without requiring any knowledge of smart contracts, key security, or treasury
management.

### Minting UX flow

- Mint page
  - Collection sold out?
    - Yes -> show sold out (V2: allow open editions; time based)
    - No -> continue
  - Do you have a wallet?
    - Yes -> continue
    - No -> show you need one (V2: allow you to specify an address)
  - Have you already minted?
    - Yes -> show you have already minted, (V2 add button to view; allow multi-claim)
    - No -> Show mint preview
- Click mint
  - Did you RT the original tweet?
    - Yes -> continue
    - No -> show you need to RT (V2: allow customizable conditions)
  - Collection sold out?
    - Yes -> show sold out (V2: allow open editions; time based)
    - No -> continue
  - Have you already minted?
    - Yes -> show you can't claim more (V2 allow multi-claim)
    - No -> Call mint API. Succeeds?
      - Yes -> Show loading screen with refresh button
      - No -> Show error

## Thanks to:

- @Zizzamia for https://github.com/Zizzamia/a-frame-in-100-lines
- @coinbase for @coinbase/onchainkit
- @farcaster for frames
