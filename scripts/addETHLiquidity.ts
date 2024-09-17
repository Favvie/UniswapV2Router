import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function main() {
    // Uniswap V2 Router Address
    const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

    // USDC Contract Address
    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

    // ETH USDC Pair Address
    const ETH_USDC_PAIR = "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc";


    // Token Holder Address
    const TOKEN_HOLDER = "0xf584F8728B874a6a5c7A8d4d387C9aae9172D621";

    await helpers.impersonateAccount(TOKEN_HOLDER);


    const impersonatedSigner = await ethers.getSigner(TOKEN_HOLDER);

    const amountUSDCDeposit = ethers.parseUnits("2", 6);
    const amountUSDCMin = ethers.parseUnits("1", 6);

    const USDC_Contract = await ethers.getContractAt("IERC20", USDC, impersonatedSigner);
    const LP_ETH_Contract = await ethers.getContractAt("IERC20", ETH_USDC_PAIR, impersonatedSigner);
    
    
    const ROUTER_CONTRACT = await ethers.getContractAt("IUniswapV2Router", ROUTER_ADDRESS, impersonatedSigner);

    await USDC_Contract.approve(ROUTER_CONTRACT, amountUSDCDeposit);
    

    const usdcBal = await USDC_Contract.balanceOf(impersonatedSigner.address);
    const ETHBal = await ethers.provider.getBalance(impersonatedSigner.address)
    const ETHUSDCBal = await LP_ETH_Contract.balanceOf(impersonatedSigner.address)

    const deadline = Math.floor(Date.now() / 1000) + (60 * 10);

    console.log("usdc balance before liquidity", Number(usdcBal));
    console.log("ETH token balance before liquidity", Number(ETHBal));
    console.log("LP ETH token balance before liquidity", Number(ETHUSDCBal));    
    

    await ROUTER_CONTRACT.addLiquidityETH(
        USDC, 
        amountUSDCDeposit, 
        amountUSDCMin, 
        1, 
        TOKEN_HOLDER, 
        deadline,
        {value: ethers.parseEther("0.1")}
        )


    console.log("=========================================================");

    const usdcBalAfter = await USDC_Contract.balanceOf(impersonatedSigner.address);
    const ETHBalAfter = await ethers.provider.getBalance(impersonatedSigner.address)
    const ETHUSDCBalAfter = await LP_ETH_Contract.balanceOf(impersonatedSigner.address);

    console.log("usdc balance after liquidity", Number(usdcBalAfter));
    console.log("ETH token balance after liquidity", Number(ETHBalAfter));
    console.log("LP ETH token balance after liquidity", Number(ETHUSDCBalAfter));

    await LP_ETH_Contract.approve(ROUTER_CONTRACT, ETHUSDCBalAfter);


    console.log("=========================================================");

    


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
