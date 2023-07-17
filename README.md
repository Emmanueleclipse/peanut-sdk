# peanut-sdk

**Send tokens via cryptographically secure links**

### Install

`npm i @squirrel-labs/peanut-sdk`

or via CDN:

`<script src="https://cdn.jsdelivr.net/npm/@squirrel-labs/peanut-sdk/index.min.js"></script> `


### Usage

Usage is as easy as:

```
import peanut from '@squirrel-labs/peanut-sdk';

// setup wallet with ethers v6 (ethersv5, web3js and viem support coming soon!)
// ...

// create link
const { link, txReceipt } = await peanut.createLink({
  signer: wallet,
  chainId: 5,
  tokenAmount: 0.0001337,
  tokenType: 0, // 0 for ether, 1 for erc20, 2 for erc721, 3 for erc1155
});

// get status of link
const status = await peanut.getLinkStatus({signer: wallet, link: link});
console.log(status);

// claim link
const claimTx = await peanut.claimLink({ signer: wallet, link: link });
```

If you want your users to be able to claim links without having to pay gas, you can use the `claimLinkGasless` function:
```
const response = await peanut.claimLinkGasless(link, wallet.address, process.env.PEANUT_DEV_API_KEY);
```
Please apply for an api key on telegram/discord for this.


### Feedback

This is an early SDK, and we're very open to suggestions and improvements. Please feel free to open an issue (or PR) on the [Github repo](https://github.com/ProphetFund/peanut-sdk/issues).


### Examples

To run the examples in examples/ folder:
  - rename .env.example to .env & fill in the values
  - run ```node examples/js-example/polygon.js``` or any of the other examples