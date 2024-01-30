import { BigNumber, Wallet } from 'ethersv5'
import { claimRaffleLink, generateAmountsDistribution, getDefaultProvider, getRaffleInfo, getRaffleLinkFromTx, interfaces, isRaffleActive, prepareRaffleDepositTxs, signAndSubmitTx, toggleVerbose } from '../../src/index'
import dotenv from 'dotenv'
dotenv.config()

const TEST_WALLET_PRIVATE_KEY = process.env.TEST_WALLET_PRIVATE_KEY!
const APIKey = process.env.PEANUT_DEV_API_KEY!

describe('raffle', () => {
  toggleVerbose(true)

  test('create a link', async () => {
    const chainId = '11155111'
    const provider = await getDefaultProvider(chainId)
    const wallet = new Wallet(TEST_WALLET_PRIVATE_KEY, provider)

    const linkDetails: interfaces.IPeanutLinkDetails = {
      chainId,
      tokenAmount: 0.01,
      tokenDecimals: 18,
      tokenType: 0,
      baseUrl: 'https://peanut.to/redpacket',
    }
    const { unsignedTxs } = await prepareRaffleDepositTxs({
      linkDetails,
      numberOfLinks: 5,
      password: '12345678',
      userAddress: wallet.address,
    })

    console.log({ unsignedTxs })

    let lastTxHash = ''
    for (let i = 0; i < unsignedTxs.length; i++) {
      const { tx, txHash } = await signAndSubmitTx({
        structSigner: {
          signer: wallet,
        },
        unsignedTx: unsignedTxs[i]
      })
      console.log('Submitted raffle tx with hash:', txHash)
      lastTxHash = txHash
      await tx.wait()
    }
    const link = await getRaffleLinkFromTx({
      txHash: lastTxHash,
      linkDetails,
      numberOfLinks: 5,
      password: '12345678',
    })
    console.log('Got the raffle link!', link)
  }, 120000)

  test('get raffle info', async () => {
    const link = ''
    const info = await getRaffleInfo({ link })
    console.log('Raffle info!', info)
  }, 120000)

  test('claim raffle link', async () => {
    const link = 'https://peanut.to/redpacket?c=11155111&v=v4.2&i=38,39,40,41,42#p=12345678'
    const claimInfo = await claimRaffleLink({
      link,
      APIKey,
      recipientAddress: '0xa3635c5A3BFb209b5caF76CD4A9CD33De65e2f72',
    })
    console.log('Claimed a raffle slot!!', claimInfo)
  }, 120000)

  test('is raffle active', async () => {
    const link1 = 'https://peanut.to/claim?c=11155111&v=v4.2&i=28,29,30,31,32#p=12345678'
    const isActive1 = await isRaffleActive({ link: link1 })
    console.log('Raffle 1 active?', isActive1)
    expect(isActive1).toBe(false)

    const link2 = 'https://peanut.to/redpacket?c=11155111&v=v4.2&i=38,39,40,41,42#p=12345678'
    const isActive2 = await isRaffleActive({ link: link2 })
    console.log('Raffle 2 active?', isActive2)
    expect(isActive2).toBe(true)
  }, 120000)

  test('generate amounts distribution', async () => {
    const totalAmount = BigNumber.from(1e6)
    const numberOfLinks = 101
    const values = generateAmountsDistribution(totalAmount, numberOfLinks)
    console.log('Values!!', values.map((val) => val.toString()))
  }, 120000)
})