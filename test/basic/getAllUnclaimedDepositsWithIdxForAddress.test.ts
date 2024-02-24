// Generated by CodiumAI
import peanut from '../../src/index' // import directly from source code
import { ethers } from 'ethersv5' // v5
import dotenv from 'dotenv'

dotenv.config()
describe('getAllCreatedLinksForAddress', () => {
	const ADDRESS = '0x2d826aD1EAD5c8a2bC46ab93d9D0c6BEe0d39918'

	it('should return all deposits for the given address if the provider is undefined v4', async () => {
		const chainId = '137'
		const address = ADDRESS
		const peanutContractVersion = 'v4'

		peanut.toggleVerbose(true)

		const allCreatedLinks = await peanut.getAllUnclaimedDepositsWithIdxForAddress({
			address,
			chainId,
			peanutContractVersion,
		})

		expect(allCreatedLinks.length).toBeGreaterThan(0)
	}, 150000)

	it('should return all deposits for the given address if the provider is undefined v4.2', async () => {
		const chainId = '137'
		const address = ADDRESS
		const peanutContractVersion = 'v4.2'

		peanut.toggleVerbose(true)

		const allCreatedLinks = await peanut.getAllUnclaimedDepositsWithIdxForAddress({
			address,
			chainId,
			peanutContractVersion,
		})

		expect(allCreatedLinks.length).toBeGreaterThan(0)
	}, 150000)

	it('should return all deposits for the given address if the provider is undefined v4.3', async () => {
		const chainId = '5000'
		const address = '0x6B3751c5b04Aa818EA90115AA06a4D9A36A16f02'
		const peanutContractVersion = 'v4.3'

		peanut.toggleVerbose(true)

		const allCreatedLinks = await peanut.getAllUnclaimedDepositsWithIdxForAddress({
			address,
			chainId,
			peanutContractVersion,
		})

		expect(allCreatedLinks.length).toBeGreaterThan(0)
	}, 150000)
})