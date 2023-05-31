## Instructions

This node project generates a pdf from the production URL https://tfg-docs.vercel.app/.

It will run chrome on the background and convert each subdomain listed on https://tfg-docs.vercel.app/ on a .pdf saved in the `output` directory. Then it will merge it and create a `result.pdf`

Make sure you have a `output` directory! And run:

```bash
yarn install
yarn start
```
