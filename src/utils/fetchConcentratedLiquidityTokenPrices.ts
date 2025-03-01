import IUniV3PoolAbi from '../abis/IUniV3Pool';
import IKyberElasticPoolAbi from '../abis/IKyberElasticPool';
import IAlgebraPool from '../abis/IAlgebraPool';
import IAlgebraPoolV1 from '../abis/IAlgebraPoolV1';
import { ChainId } from '../../packages/address-book/src/types/chainid';
import { fetchContract } from '../api/rpc/client';
import { chain } from 'lodash';

type ConcentratedLiquidityToken = {
  type: string;
  oracleId: string;
  decimalDelta: number;
  pool: `0x${string}`;
  firstToken: string;
  secondToken: string;
};

const tokens: Partial<Record<keyof typeof ChainId, ConcentratedLiquidityToken[]>> = {
  ethereum: [
    {
      type: 'Kyber',
      oracleId: 'KNC',
      decimalDelta: 1,
      pool: '0xB5e643250FF59311071C5008f722488543DD7b3C',
      firstToken: 'KNC',
      secondToken: 'ETH',
    },
    {
      type: 'UniV3',
      oracleId: 'R',
      decimalDelta: 1e12,
      pool: '0x190ed02adaf1ef8039fcd3f006b42553467d5045',
      firstToken: 'USDC',
      secondToken: 'R',
    },
    {
      type: 'UniV3',
      oracleId: 'AXL',
      decimalDelta: 1,
      pool: '0x5B0d2536F0c970B8d9CBF3959460fb97Ce808Ade',
      firstToken: 'USDC',
      secondToken: 'AXL',
    },
    {
      type: 'UniV3',
      oracleId: 'BIFI',
      decimalDelta: 1,
      pool: '0xfBa26C3F9C8eCeF989def3C5c8aD037487462d83',
      firstToken: 'WETH',
      secondToken: 'BIFI',
    },
    {
      type: 'UniV3',
      oracleId: 'RPL',
      decimalDelta: 1,
      pool: '0xe42318eA3b998e8355a3Da364EB9D48eC725Eb45',
      firstToken: 'RPL',
      secondToken: 'WETH',
    },
    {
      type: 'UniV3',
      oracleId: 'GNO',
      decimalDelta: 1,
      pool: '0xf56D08221B5942C428Acc5De8f78489A97fC5599',
      firstToken: 'WETH',
      secondToken: 'GNO',
    },
    {
      type: 'UniV3',
      oracleId: 'weETH',
      decimalDelta: 1,
      pool: '0x7A415B19932c0105c82FDB6b720bb01B0CC2CAe3',
      firstToken: 'weETH',
      secondToken: 'WETH',
    },
    {
      type: 'UniV3',
      oracleId: 'COMP',
      decimalDelta: 1,
      pool: '0xea4Ba4CE14fdd287f380b55419B1C5b6c3f22ab6',
      firstToken: 'WETH',
      secondToken: 'COMP',
    },
    {
      type: 'UniV3',
      oracleId: 'SDL',
      decimalDelta: 1,
      pool: '0x51d1026e35d0F9aa0fF243ebC84bb923852c1fC3',
      firstToken: 'SDL',
      secondToken: 'LINK',
    },
    {
      type: 'UniV3',
      oracleId: 'DINERO',
      decimalDelta: 1,
      pool: '0x7138eAe57e8a214F7297E5E67bB6e183dF3572D5',
      firstToken: 'WETH',
      secondToken: 'DINERO',
    },
  ],
  polygon: [
    {
      type: 'UniV3',
      oracleId: 'BAL',
      decimalDelta: 1,
      pool: '0x4fe1269a585B141F11C3E144158f9f8823c7C0e7',
      firstToken: 'BAL',
      secondToken: 'ETH',
    },
    {
      type: 'UniV3',
      oracleId: 'RETRO',
      decimalDelta: 1,
      pool: '0x35394eED0Be676ec6470fE6531daD809265310ff',
      firstToken: 'RETRO',
      secondToken: 'ETH',
    },
    {
      type: 'UniV3',
      oracleId: 'oRETRO',
      decimalDelta: 1,
      pool: '0x387FBcE5E2933Bd3a7243D0be2aAC8fD9Ab3D55d',
      firstToken: 'RETRO',
      secondToken: 'oRETRO',
    },
    {
      type: 'UniV3',
      oracleId: 'CASH',
      decimalDelta: 1,
      pool: '0x63ca6ED3D390C725b7FEb617BAdcab78a61038E8',
      firstToken: 'CASH',
      secondToken: 'MATIC',
    },
  ],
  arbitrum: [
    {
      type: 'UniV3',
      oracleId: 'SVY',
      decimalDelta: 1,
      pool: '0xc3fCF0EF6635f0157f567f92050a23D407976dAa',
      firstToken: 'WETH',
      secondToken: 'SVY',
    },
    {
      type: 'UniV3',
      oracleId: 'oLIT',
      decimalDelta: 1,
      pool: '0xCD744779CAFD693B16A269f2AD6ac69a0E6E5056',
      firstToken: 'WETH',
      secondToken: 'oLIT',
    },
    {
      type: 'UniV3',
      oracleId: 'svETH',
      decimalDelta: 1,
      pool: '0x6a28350341A27e98170b6e8274bF2382B4DAe6AC',
      firstToken: 'svETH',
      secondToken: 'frxETH',
    },
    {
      type: 'UniV3',
      oracleId: 'svUSD',
      decimalDelta: 1,
      pool: '0x28082db75615849D12f37627E614b479749C7903',
      firstToken: 'svUSD',
      secondToken: 'FRAX',
    },
    {
      type: 'AlgebraV1',
      oracleId: 'svBTC',
      decimalDelta: 1e-10,
      pool: '0xA27cb8a8ACf2DE50f3174cb68ec0bD3180D53921',
      firstToken: 'svBTC',
      secondToken: 'WBTC',
    },
    {
      type: 'UniV3',
      oracleId: 'LODE',
      decimalDelta: 1,
      pool: '0xdEb066fE0e7726CbD5d0c4D5A210CfaA16ae1DDA',
      firstToken: 'LODE',
      secondToken: 'ETH',
    },
    {
      type: 'UniV3',
      oracleId: 'SILO',
      decimalDelta: 1,
      pool: '0xd3E11119d2680c963F1CDCffeCe0c4adE823Fb58',
      firstToken: 'ETH',
      secondToken: 'SILO',
    },
    {
      type: 'UniV3',
      oracleId: 'arbOVN',
      decimalDelta: 1e12,
      pool: '0x714D48cb99b87F274B33A89fBb16EaD191B40b6C',
      firstToken: 'arbUSD+',
      secondToken: 'arbOVN',
    },
  ],
  moonbeam: [
    {
      type: 'UniV3',
      oracleId: 'USDCwh',
      decimalDelta: 1e-12,
      pool: '0xF7e2F39624AAd83AD235A090bE89b5fa861c29B8',
      firstToken: 'GLMR',
      secondToken: 'USDCwh',
    },
  ],
  linea: [
    {
      type: 'Algebra',
      oracleId: 'LYNX',
      decimalDelta: 1e-12,
      pool: '0xdDa5Ec5Af00AB99dC80c33E08881EB80C027d498',
      firstToken: 'LYNX',
      secondToken: 'USDC',
    },
  ],
  real: [
    {
      type: 'UniV3',
      oracleId: 'arcUSD',
      decimalDelta: 1e12,
      pool: '0x22aC4821bBb8d1AC42eA7F0f32ed415F52577Ca1',
      firstToken: 'USDC',
      secondToken: 'arcUSD',
    },
    {
      type: 'UniV3',
      oracleId: 'USTB',
      decimalDelta: 1,
      pool: '0xC6B3AaaAbf2f6eD6cF7fdFFfb0DaC45E10c4A5B3',
      firstToken: 'arcUSD',
      secondToken: 'USTB',
    },
    {
      type: 'UniV3',
      oracleId: 'PEARL',
      decimalDelta: 1,
      pool: '0x35BA384F9D30D68028898849ddBf5bda09bbE7EA',
      firstToken: 'PEARL',
      secondToken: 'USTB',
    },
    {
      type: 'UniV3',
      oracleId: 'reETH',
      decimalDelta: 1,
      pool: '0x5dfa942B42841Dd18883838D8F4e5f7d8CEb5Eeb',
      firstToken: 'reETH',
      secondToken: 'USTB',
    },
    {
      type: 'UniV3',
      oracleId: 'RWA',
      decimalDelta: 1,
      pool: '0x182d3F8e154EB43d5f361a39A2234A84508244c9',
      firstToken: 'reETH',
      secondToken: 'RWA',
    },
    {
      type: 'UniV3',
      oracleId: 'MORE',
      decimalDelta: 1,
      pool: '0x6b1a34df762f1d3367e7e93AE5661c88CA848423',
      firstToken: 'USTB',
      secondToken: 'MORE',
    },
  ],
  optimism: [
    {
      type: 'UniV3',
      oracleId: 'uniBTC',
      decimalDelta: 1,
      pool: '0xa5B6d588CEb3aA1BF543d095038479188f884690',
      firstToken: 'uniBTC',
      secondToken: 'WBTC',
    },
  ],
};

async function getConcentratedLiquidityPrices(
  tokenPrices: Record<string, number>,
  chainTokens: ConcentratedLiquidityToken[],
  chainId: ChainId
): Promise<number[]> {
  const concentratedLiquidityPriceCalls = chainTokens.map(token => {
    if (token.type == 'Kyber') {
      const tokenContract = fetchContract(token.pool, IKyberElasticPoolAbi, chainId);
      return tokenContract.read.getPoolState();
    } else if (token.type == 'Algebra') {
      const tokenContract = fetchContract(token.pool, IAlgebraPool, chainId);
      return tokenContract.read.globalState();
    } else if (token.type == 'AlgebraV1') {
      const tokenContract = fetchContract(token.pool, IAlgebraPoolV1, chainId);
      return tokenContract.read.globalState();
    } else {
      const tokenContract = fetchContract(token.pool, IUniV3PoolAbi, chainId);
      return tokenContract.read.slot0();
    }
  });

  try {
    const res = await Promise.all(concentratedLiquidityPriceCalls);
    const tokenPrice = res.map(v => Number(v[1]));
    const prices = {};
    tokenPrice.forEach((v, i) => {
      const first = chainTokens[i].firstToken;
      const second = chainTokens[i].secondToken;
      prices[chainTokens[i].oracleId] =
        first == chainTokens[i].oracleId
          ? (tokenPrices[second] || prices[second]) /
            (chainTokens[i].decimalDelta * Math.pow(1.0001, v))
          : (tokenPrices[first] || prices[first]) *
            (chainTokens[i].decimalDelta * Math.pow(1.0001, v));
    });
    return Object.values(prices);
  } catch (e) {
    console.error('getConcentratedLiquidityPrices', e);
    return chainTokens.map(() => 0);
  }
}

export async function fetchConcentratedLiquidityTokenPrices(
  tokenPrices
): Promise<Record<string, number>> {
  const pricesByChain: Record<string, number>[] = await Promise.all(
    Object.entries(tokens).map(async ([chainId, chainTokens]) => {
      const prices = await getConcentratedLiquidityPrices(
        tokenPrices,
        chainTokens,
        ChainId[chainId]
      );
      return Object.fromEntries(chainTokens.map((token, i) => [token.oracleId, prices[i] || 0]));
    })
  );

  return Object.assign({}, ...pricesByChain);
}
