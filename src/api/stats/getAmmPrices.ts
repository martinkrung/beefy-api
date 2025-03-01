`use strict`;

import { fetchAmmPrices } from '../../utils/fetchAmmPrices';
import { fetchMooPrices } from '../../utils/fetchMooPrices';
import { fetchXPrices } from '../../utils/fetchXPrices';
import { fetchOptionTokenPrices } from '../../utils/fetchOptionTokenPrices';
import { fetchWrappedAavePrices } from '../../utils/fetchWrappedAaveTokenPrices';
import { fetchJbrlPrice } from '../../utils/fetchJbrlPrice';
import { fetchyVaultPrices } from '../../utils/fetchyVaultPrices';
import { fetchCurveTokenPrices } from '../../utils/fetchCurveTokenPrices';
import { fetchConcentratedLiquidityTokenPrices } from '../../utils/fetchConcentratedLiquidityTokenPrices';
import { fetchSolidlyStableTokenPrices } from '../../utils/fetchSolidlyStableTokenPrices';
import {
  fetchBalancerLinearPoolPrice,
  fetchBalancerStablePoolPrice,
} from '../../utils/fetchBalancerStablePoolPrices';
import { fetchCoinGeckoPrices } from '../../utils/fetchCoinGeckoPrices';
import { fetchDefillamaPrices } from '../../utils/fetchDefillamaPrices';
import { getKey, setKey } from '../../utils/cache';

import getNonAmmPrices from './getNonAmmPrices';
import pangolinPools from '../../data/avax/pangolinLpPools.json';
import comAvaxPools from '../../data/avax/comAvaxLpPools.json';
import ellipsisPools from '../../data/bsc/ellipsisLpPools.json';
import olivePools from '../../data/avax/oliveLpPools.json';
import mdexBscPools from '../../data/bsc/mdexBscLpPools.json';
import lydPools from '../../data/avax/lydLpPools.json';
import froyoPools from '../../data/fantom/froyoLpPools.json';
import esterPools from '../../data/fantom/esterLpPools.json';
import tombPools from '../../data/fantom/tombLpPools.json';
import spiritPools from '../../data/fantom/spiritPools.json';
import sushiOnePools from '../../data/one/sushiLpPools.json';
import steakhouseLpPools from '../../data/fantom/steakhouseLpPools.json';
import stakesteakLpPools from '../../data/fantom/stakesteakLpPools.json';
import joePools from '../../data/avax/joeLpPools.json';
import joeDualLpPools from '../../data/avax/joeDualLpPools.json';
import jetswapFantomPools from '../../data/fantom/jetswapLpPools.json';
import geistPools from '../../data/fantom/geistLpPools.json';
import singularAvaxPools from '../../data/avax/singularLpPools.json';
import singularFantomPools from '../../data/fantom/singularLpPools.json';
import oldPools from '../../data/archive/oldLpPools.json';
import pearzapFantomPools from '../../data/fantom/pearzapLpPools.json';
import sushiCeloPools from '../../data/celo/sushiLpPools.json';
import mooTokens from '../../data/mooTokens.json';
import summitPools from '../../data/fantom/summitLpPools.json';
import solarbeamPools from '../../data/moonriver/solarbeamLpPools.json';
import sushiMr from '../../data/moonriver/sushiLp.json';
import sushiMrPools from '../../data/moonriver/sushiLpPools.json';
import vvsPools from '../../data/cronos/vvsLpPools.json';
import cronaPools from '../../data/cronos/cronaLpPools.json';
import solarbeamDualLpPools from '../../data/moonriver/solarbeamDualLpPools.json';
import trisolarisLpPools from '../../data/aurora/trisolarisLpPools.json';
import maiAvaxLpPools from '../../data/avax/maiLpPools.json';
import finnLpPools from '../../data/moonriver/finnLpPools.json';
import charmPools from '../../data/fantom/charmLpPools.json';
import solarbeamDualLpV2Pools from '../../data/moonriver/solarbeamDualLpV2Pools.json';
import liquidusPools from '../../data/cronos/liquidusLpPools.json';
import sushiv2Celo from '../../data/celo/sushiv2LpPools.json';
import popsicleFantomPools from '../../data/fantom/popsicleLpPools.json';
import fusefiPools from '../../data/fuse/fusefiLpPools.json';
import netswapPools from '../../data/metis/netswapLpPools.json';
import pangolinV2Pools from '../../data/avax/pangolinv2LpPools.json';
import pangolinV2DualPools from '../../data/avax/pangolinV2DualLpPools.json';
import t2ombLpPools from '../../data/fantom/2ombLpPools.json';
import tethysPools from '../../data/metis/tethysLpPools.json';
import oxdaoPools from '../../data/fantom/0xdaoPools.json';
import sushiFtmPools from '../../data/fantom/sushiFtmLpPools.json';
import sushiFusePools from '../../data/fuse/sushiFuseLpPools.json';
import grapePools from '../../data/avax/grapeLpPools.json';
import trisolarisMiniPools from '../../data/aurora/trisolarisMiniLpPools.json';
import creditumPools from '../../data/fantom/creditumPools.json';
import ripaePools from '../../data/fantom/ripaeLpPools.json';
import ripaeAvaxPools from '../../data/avax/ripaeLpPools.json';
import beamswapPools from '../../data/moonbeam/beamswapLpPools.json';
import beamswapMultiRewardLpPools from '../../data/moonbeam/beamswapMultiRewardLpPools.json';
import stellaswapPools from '../../data/moonbeam/stellaswapLpPools.json';
import stellaswapPoolsV2 from '../../data/moonbeam/stellaswapLpV2Pools.json';
import darkCryptoPools from '../../data/cronos/darkCryptoLpPools.json';
import wigoPools from '../../data/fantom/wigoLpPools.json';
import solidlyPools from '../../data/fantom/solidlyLpPools.json';
import solarflare from '../../data/moonbeam/solarFlareLpPools.json';
import basedPools from '../../data/fantom/basedLpPools.json';
import voltagePools from '../../data/fuse/voltageLpPools.json';
import bombSwapPools from '../../data/fantom/bombSwapPools.json';
import vvsDualPools from '../../data/cronos/vvsDualLpPools.json';
import joeBoostedLpPools from '../../data/avax/joeBoostedLpPools.json';
import spookyV2LpPools from '../../data/fantom/spookyV2LpPools.json';
import spookyV3LpPools from '../../data/fantom/spookyV3LpPools.json';
import valleySwapLpPools from '../../data/emerald/valleySwapLpPools.json';
import yuzuLpPools from '../../data/emerald/yuzuLpPools.json';
import yuzuDualPools from '../../data/emerald/yuzuDualLpPools.json';
import velodromePools from '../../data/optimism/velodromeLpPools.json';
import oldVelodromePools from '../../data/optimism/oldVelodromeLpPools.json';
import ripaeCronosPools from '../../data/cronos/ripaeLpPools.json';
import swapsiclePools from '../../data/avax/siclePools.json';
import spiritV2Pools from '../../data/fantom/spiritVolatileLpPools.json';
import hermesPools from '../../data/metis/hermesLpPools.json';
import equalizerPools from '../../data/fantom/equalizerLpPools.json';
import equalizerV2Pools from '../../data/fantom/equalizerV2LpPools.json';
import thenaPools from '../../data/bsc/thenaLpPools.json';
import sushiMainnetPools from '../../data/ethereum/sushiLpPools.json';
import synapseLpPools from '../../data/ethereum/synapseLpPools.json';
import solidlyLpPools from '../../data/ethereum/solidlyLpPools.json';
import cantoLpPools from '../../data/canto/cantoLpPools.json';
import solidLizardPools from '../../data/arbitrum/solidlizardLpPools.json';
import velocimeterPools from '../../data/canto/velocimeterLpPools.json';
import velocimeterV2Pools from '../../data/canto/velocimeterV2LpPools.json';
import equilibrePools from '../../data/kava/equilibreLpPools.json';
import versePools from '../../data/ethereum/verseLpPools.json';
import ramsesPools from '../../data/arbitrum/ramsesLpPools.json';
import velocorePools from '../../data/zksync/velocoreLpPools.json';
import soliSnekPools from '../../data/avax/soliSnekLpPools.json';
import veSyncPools from '../../data/zksync/veSyncLpPools.json';
import fvmPools from '../../data/fantom/fvmLpPools.json';
import bvmPools from '../../data/base/bvmLpPools.json';
import cvmPools from '../../data/canto/cvmLpPools.json';
import baseSwapPools from '../../data/base/baseSwapLpPools.json';
import ooeV2Pools from '../../data/bsc/ooeV2LpPools.json';
import draculaPools from '../../data/zksync/draculaLpPools.json';
import aerodromePools from '../../data/base/aerodromeLpPools.json';
import alienBasePools from '../../data/base/alienBaseLpPools.json';
import swapBasedPools from '../../data/base/swapBasedLpPools.json';
import basoPools from '../../data/base/basoLpPools.json';
import equalizerBasePools from '../../data/base/equalizerLpPools.json';
import moePools from '../../data/mantle/moeLpPools.json';
import lynexPools from '../../data/linea/lynexVolatilePools.json';
import nilePools from '../../data/linea/nileVolatilePools.json';
import raPools from '../../data/fraxtal/raPools.json';
import velodromeModePools from '../../data/mode/velodromeModePools.json';
import { fetchVaultPrices } from '../../utils/fetchVaultPrices';
import { addressBookByChainId } from '../../../packages/address-book/src/address-book';
import { sleep } from '../../utils/time';
import { isFiniteNumber } from '../../utils/number';
import { serviceEventBus } from '../../utils/ServiceEventBus';
import { fetchChainLinkPrices } from '../../utils/fetchChainLinkPrices';
import { fetchVenusPrices } from './bsc/venus/getVenusPrices';
import { getLpBasedPrices } from './getLpBasedPrices';
import uniswapLpPools from '../../data/ethereum/uniswapV2LpPools.json';
import { fetchDexScreenerPriceOracles, OraclePriceRequest } from '../../utils/fetchDexScreenerPrices';

const INIT_DELAY = 2 * 1000;
const REFRESH_INTERVAL = 5 * 60 * 1000;

// FIXME: if this list grows too big we might hit the ratelimit on initialization everytime
// Implement in case of emergency -> https://github.com/beefyfinance/beefy-api/issues/103
const pools = normalizePoolOracleIds([
  ...velodromeModePools,
  ...raPools,
  ...moePools,
  ...equalizerBasePools,
  ...lynexPools,
  ...nilePools,
  ...basoPools,
  ...swapBasedPools,
  ...alienBasePools,
  ...aerodromePools,
  ...draculaPools,
  ...ooeV2Pools,
  ...baseSwapPools,
  ...fvmPools,
  ...bvmPools,
  ...cvmPools,
  ...veSyncPools,
  ...soliSnekPools,
  ...velocorePools,
  ...ramsesPools,
  ...versePools,
  ...equilibrePools,
  ...velocimeterV2Pools,
  ...velocimeterPools,
  ...solidLizardPools,
  ...cantoLpPools,
  ...solidlyLpPools,
  ...synapseLpPools,
  ...sushiMainnetPools,
  ...thenaPools,
  ...equalizerV2Pools,
  ...equalizerPools,
  ...hermesPools,
  ...spiritV2Pools,
  ...swapsiclePools,
  ...ripaeCronosPools,
  ...velodromePools,
  ...oldVelodromePools,
  // ...valleySwapLpPools,
  //...yuzuDualPools,
  //...yuzuLpPools,
  ...spookyV2LpPools,
  ...spookyV3LpPools,
  ...vvsDualPools,
  ...joeBoostedLpPools,
  ...bombSwapPools,
  ...voltagePools,
  ...basedPools,
  ...stellaswapPools,
  ...stellaswapPoolsV2,
  ...solarflare,
  ...solidlyPools,
  ...wigoPools,
  ...darkCryptoPools,
  ...ripaePools,
  ...ripaeAvaxPools,
  ...creditumPools,
  ...trisolarisMiniPools,
  ...grapePools,
  ...sushiFusePools,
  ...sushiFtmPools,
  ...oxdaoPools,
  ...tethysPools,
  ...t2ombLpPools,
  ...pangolinV2Pools,
  ...pangolinV2DualPools,
  ...netswapPools,
  ...fusefiPools,
  ...popsicleFantomPools,
  ...sushiv2Celo,
  ...liquidusPools,
  ...solarbeamDualLpV2Pools,
  ...charmPools,
  ...oldPools,
  ...beamswapMultiRewardLpPools,
  ...beamswapPools,
  ...finnLpPools,
  ...maiAvaxLpPools,
  ...trisolarisLpPools,
  ...solarbeamDualLpPools,
  ...cronaPools,
  ...vvsPools,
  ...sushiMrPools,
  ...sushiMr,
  ...solarbeamPools,
  ...summitPools,
  ...pearzapFantomPools,
  ...sushiCeloPools,
  ...geistPools,
  ...singularAvaxPools,
  ...singularFantomPools,
  ...jetswapFantomPools,
  ...joePools,
  ...joeDualLpPools,
  ...steakhouseLpPools,
  ...sushiOnePools,
  ...spiritPools,
  ...tombPools,
  ...esterPools,
  ...froyoPools,
  ...lydPools,
  ...mdexBscPools,
  ...olivePools,
  ...ellipsisPools,
  ...comAvaxPools,
  ...pangolinPools,
  ...uniswapLpPools,
]);

/**
 * Map of coingecko ids to oracleIds
 * Each of these prices will be set as seed prices
 * Add here only as last resort if no other AMM price source is available
 * @see fetchSeedPrices
 */
const coinGeckoCoins: Record<string, string[]> = {
  'stasis-eurs': ['EURS'],
  'tether-eurt': ['EURt'],
  'par-stablecoin': ['PAR'],
  'jarvis-synthetic-euro': ['jEUR'],
  'monerium-eur-money': ['EURe'],
  jpyc: ['JPYC', 'jJPY'],
  'cad-coin': ['CADC', 'jCAD'],
  xsgd: ['XSGD', 'jSGD'],
  'usd-balance': ['USDB'],
  gelato: ['GEL'],
  'perpetual-protocol': ['PERP'],
  nusd: ['sUSD'],
  'lyra-finance': ['LYRA'],
  'liquity-usd': ['LUSD'],
  seth: ['sETH'],
  'alchemix-usd': ['alUSD'],
  kava: ['KAVA', 'WKAVA'],
  'aura-finance': ['AURA'],
  havven: ['hSNX'],
  'aura-bal': ['auraBAL'],
  'coinbase-wrapped-staked-eth': ['cbETH'],
  'opx-finance': ['OPX', 'beOPX'],
  'dola-usd': ['DOLA'],
  'across-protocol': ['ACX'],
  'metavault-trade': ['MVX'],
  seur: ['sEUR'],
  euler: ['EUL'],
  axlusdc: ['axlUSDC'],
  'mimo-parallel-governance-token': ['MIMO'],
  olympus: ['OHM'],
  'ankr-reward-bearing-ftm': ['ankrFTM'],
  lucha: ['LUCHA'],
  'cow-protocol': ['COW'],
  'electronic-usd': ['eUSD'],
  // 'overnight-finance': ['OVN'],
  'gyroscope-gyd': ['GYD'],
  'renzo-restaked-eth': ['ezETH'],
  'qi-dao': ['QIv2'],
  'verified-usd-foundation-usdv': ['USDV'],
  'stake-dao-crv': ['sdCRV'],
  'kelp-dao-restaked-eth': ['rsETH'],
  'frax-ether': ['frxETH'],
  'stakestone-ether': ['STONE'],
  'alchemix-eth': ['alETH'],
  pepe: ['PEPE'],
  layerzero: ['ZRO'],
  'camelot-token': ['xGRAIL'],
  zksync: ['ZK'],
  'wrapped-oeth': ['WOETH'],
  'manta-network': ['MANTA'],
  foxy: ['FOXY'],
  'ether-fi': ['ETHFI'],
  'anzen-usdz': ['USDz'],
  chompcoin: ['CHOMP'],
  'davos-protocol': ['DUSD'],
  'synclub-staked-bnb': ['slisBNB'],
  'helio-protocol-hay': ['lisUSD'],
  'usual-usd': ['USD0'],
  'usd0-liquid-bond': ['USD0++'],
  'badger-dao': ['BADGER'],
  'overnight-finance': ['oOVN'],
  'dinero-staked-eth': ['pxETH'],
  'based-pepe': ['basePEPE'],
  toshi: ['TOSHI'],
  somon: ['OwO'],
};

/**
 * Coins to fetch from dexscreener
 */
const dexscreenerCoins: OraclePriceRequest[] = [
  {
    oracleId: 'lineaUSDT+',
    tokenAddress: '0x1E1F509963A6D33e169D9497b11c7DbFe73B7F13',
    chainId: 'linea',
  },
  {
    oracleId: 'lineaUSD+',
    tokenAddress: '0xB79DD08EA68A908A97220C76d19A6aA9cBDE4376',
    chainId: 'linea',
  },
  {
    oracleId: 'arbOVN',
    tokenAddress: '0xA3d1a8DEB97B111454B294E2324EfAD13a9d8396',
    chainId: 'arbitrum',
  },
  {
    oracleId: 'oOVN',
    tokenAddress: '0x3b08fcd15280e7B5A6e404c4abb87F7C774D1B2e',
    chainId: 'optimism',
  },
  {
    oracleId: 'arbUSD+',
    tokenAddress: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
    chainId: 'arbitrum',
  },
  {
    oracleId: 'mantleUSDe',
    tokenAddress: '0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34',
    chainId: 'mantle',
  },
  {
    oracleId: 'baseHAI',
    tokenAddress: '0x10398AbC267496E49106B07dd6BE13364D10dC71',
    chainId: 'optimism',
  },
  {
    oracleId: 'lineainETH',
    tokenAddress: '0x5A7a183B6B44Dc4EC2E3d2eF43F98C5152b1d76d',
    chainId: 'linea',
  },
  {
    oracleId: 'KNOX',
    tokenAddress: '0x0BBF664D46becc28593368c97236FAa0fb397595',
    chainId: 'arbitrum',
  },
  {
    oracleId: 'NORMUS',
    tokenAddress: '0xBA5EDE8d98ab88CEa9f0D69918ddE28Dc23c2553',
    chainId: 'base',
  },
  {
    oracleId: 'arbwUSDM',
    tokenAddress: '0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812',
    chainId: 'arbitrum',
  },
  {
    oracleId: 'baseDOLA',
    tokenAddress: '0x4621b7A9c75199271F773Ebd9A499dbd165c3191',
    chainId: 'base',
  },
  {
    oracleId: 'lineaZERO',
    tokenAddress: '0x78354f8DcCB269a615A7e0a24f9B0718FDC3C7A7',
    chainId: 'linea',
  },
  {
    oracleId: 'arbETHx',
    tokenAddress: '0xED65C5085a18Fa160Af0313E60dcc7905E944Dc7',
    chainId: 'arbitrum',
  },
];

/**
 * Can use any oracleId set from chainlink or coingecko here
 * Runs after chainlink/coingecko/dexscreener prices are fetched but before any other price sources
 * Add here only as last resort if no other AMM price source is available
 * @see fetchSeedPrices
 */
const seedPeggedPrices = {
  WETH: 'ETH', // Wrapped native
  WBTC: 'BTC', // Wrapped native
  WMATIC: 'MATIC', // Wrapped native
  WAVAX: 'AVAX', // Wrapped native
  WBNB: 'BNB', // Wrapped native
  WFTM: 'FTM', // Wrapped native
  WKAVA: 'KAVA', // Wrapped native
  asUSDC: 'USDC', // Solana
  aUSDT: 'USDT', // Aave
  aDAI: 'DAI', // Aave
  aUSDC: 'USDC', // Aave
  aETH: 'ETH', // Aave
  amUSDT: 'USDT', // Aave
  amUSDC: 'USDC', // Aave
  amDAI: 'DAI', // Aave
  aaUSDT: 'USDT', // Aave
  aaUSDC: 'USDC', // Aave
  aArbUSDCn: 'USDC', // Aave
  aaDAI: 'DAI', // Aave
  aavAVAX: 'AVAX', // Aave
  aavUSDC: 'USDC', // Aave
  aavUSDT: 'USDT', // Aave
  'DAI+': 'DAI', // Overnight
  hETH: 'ETH', // HOP
  hDAI: 'DAI', // HOP
  hUSDC: 'USDC', // HOP
  hUSDT: 'USDT', // HOP
  aWMATIC: 'MATIC', // Aave
  aWETH: 'ETH', // Aave,
  cArbUSDCv3: 'USDC', // Compound
  aOptUSDC: 'USDC', //Aave
  aOptUSDCn: 'USDC', //Aave
  axlUSDC: 'USDC', // Axelar
  xcUSDC: 'USDC', // Kusama
  xcUSDT: 'USDT', // Kusama
  WSEI: 'SEI', // Wrapped SEI
};

export type BaseLpBreakdown = {
  price: number;
  tokens: string[];
  balances: string[];
  totalSupply: string;
};
export type ClmLpBreakdown = BaseLpBreakdown & {
  underlyingLiquidity: string;
  underlyingBalances: string[];
  underlyingPrice: number;
};
export type LpBreakdown = BaseLpBreakdown | ClmLpBreakdown;
export type PricesById = Record<string, number>;
export type BreakdownsById = Record<string, LpBreakdown>;

const cachedTokenPrices: PricesById = {};
const cachedLpPrices: PricesById = {};
const cachedAllPrices: PricesById = {};
const cachedLpBreakdowns: BreakdownsById = {};

const ORACLES_TO_BE_CLEARED = [];

async function fetchSeedPrices() {
  const [seedPrices, coinGeckoPrices, defillamaPrices, dexscreenerPrices] = await Promise.all([
    // ChainLink gives: ETH, BTC, MATIC, AVAX, BNB, LINK, USDT, DAI, USDC
    fetchChainLinkPrices(),
    fetchCoinGeckoPrices(Object.keys(coinGeckoCoins)),
    fetchDefillamaPrices(Object.keys(coinGeckoCoins)),
    fetchDexScreenerPriceOracles(dexscreenerCoins),
  ]);

  // CoinGecko
  for (const [geckoId, oracleIds] of Object.entries(coinGeckoCoins)) {
    for (const oracleId of oracleIds) {
      const cg = coinGeckoPrices[geckoId];
      const dl = defillamaPrices[geckoId];
      if (!cg) seedPrices[oracleId] = dl;
      else if (!dl) seedPrices[oracleId] = cg;
      else {
        seedPrices[oracleId] = cg;
        const diff = (Math.abs(cg - dl) / cg) * 100;
        if (diff > 10) {
          console.log(oracleId, 'price on CoinGecko and Defillama is too different', cg, dl);
        }
      }
    }
  }

  // DexScreener
  for (const [oracleId, price] of Object.entries(dexscreenerPrices)) {
    seedPrices[oracleId] = price;
  }

  // Set pegged prices
  for (const [oracle, peggedOracle] of Object.entries(seedPeggedPrices)) {
    if (peggedOracle in seedPrices) {
      seedPrices[oracle] = seedPrices[peggedOracle];
    } else {
      console.error(`Pegged oracle ${peggedOracle} not found for ${oracle}`);
    }
  }

  return seedPrices;
}

async function performUpdateAmmPrices() {
  // Seed with chain link + coin gecko prices
  const knownPrices = await fetchSeedPrices();

  const ammPrices = fetchAmmPrices(pools, knownPrices).then(prices => {
    //Set prices for the wrapped version of native tokens (if native was set)
    const nativeTokens = new Set(
      Object.values(addressBookByChainId).map(addressbook => addressbook.tokens.WNATIVE.oracleId.slice(1))
    );
    nativeTokens.forEach(nativeToken => {
      if (prices.tokenPrices.hasOwnProperty(nativeToken))
        prices.tokenPrices[`W${nativeToken}`] = prices.tokenPrices[nativeToken];
    });
    return prices;
  });

  const venusPrices = ammPrices.then(async ({ tokenPrices }) => {
    return await fetchVenusPrices(tokenPrices);
  });

  const curveTokenPrices = ammPrices.then(async ({ tokenPrices }) => {
    return await fetchCurveTokenPrices(tokenPrices);
  });

  const solidlyStableTokenPrices = ammPrices.then(async ({ tokenPrices }) => {
    return await fetchSolidlyStableTokenPrices(tokenPrices);
  });

  const xPrices = ammPrices.then(async ({ tokenPrices }) => {
    return await fetchXPrices(tokenPrices);
  });

  const mooPrices = ammPrices.then(async ({ poolPrices, tokenPrices }) => {
    return await fetchMooPrices(mooTokens, tokenPrices, poolPrices);
  });

  const optionPrices = ammPrices.then(async ({ tokenPrices }) => {
    const concLiqPrices = await fetchConcentratedLiquidityTokenPrices(tokenPrices);
    const prices = { ...tokenPrices, ...concLiqPrices };
    const optionPrices = await fetchOptionTokenPrices(prices);
    return {
      ...optionPrices,
      ...concLiqPrices,
    };
  });

  const linearPoolPrice = ammPrices.then(async ({ tokenPrices }): Promise<Record<string, number>> => {
    const jbrlTokenPrice = await fetchJbrlPrice();
    const yVaultPrices = await fetchyVaultPrices(tokenPrices);
    const vaultPrices = await fetchVaultPrices(tokenPrices);
    const wrappedAavePrices = await fetchWrappedAavePrices(tokenPrices);
    const prices = {
      ...tokenPrices,
      ...vaultPrices,
      ...wrappedAavePrices,
      ...jbrlTokenPrice,
      ...yVaultPrices,
    };

    const linearPrices = await fetchBalancerLinearPoolPrice(prices);
    const balancerStablePoolPrice = await fetchBalancerStablePoolPrice(linearPrices);

    return {
      ...linearPrices,
      ...balancerStablePoolPrice,
      ...wrappedAavePrices,
      ...jbrlTokenPrice,
      ...yVaultPrices,
    };
  });

  const beTokenPrice = ammPrices.then(async ({ tokenPrices }) => {
    return {
      beJOE: tokenPrices['JOE'],
      beQI: tokenPrices['QI'],
      beCAKE: tokenPrices['Cake'],
      beVelo: tokenPrices['BeVELO'],
    };
  });

  const tokenPrices = ammPrices.then(async ({ tokenPrices }) => {
    const curvePrices = await curveTokenPrices;
    const solidlyStablePrices = await solidlyStableTokenPrices;
    const xTokenPrices = await xPrices;
    const mooTokenPrices = await mooPrices;
    const beTokenTokenPrice = await beTokenPrice;
    const linearPoolTokenPrice = await linearPoolPrice;
    const venusTokenPrice = await venusPrices;
    const optionTokenPrice = await optionPrices;
    return {
      ...tokenPrices,
      ...mooTokenPrices,
      ...xTokenPrices,
      ...beTokenTokenPrice,
      ...curvePrices,
      ...solidlyStablePrices,
      ...linearPoolTokenPrice,
      ...venusTokenPrice,
      ...optionTokenPrice,
    };
  });

  const lpData = ammPrices.then(async ({ poolPrices, lpsBreakdown }) => {
    const nonAmmPrices = await getNonAmmPrices(await tokenPrices);
    const pendlePrices = await getLpBasedPrices(await tokenPrices, poolPrices, nonAmmPrices);

    return {
      prices: { ...poolPrices, ...nonAmmPrices.prices, ...pendlePrices.prices },
      breakdown: {
        ...lpsBreakdown,
        ...nonAmmPrices.breakdown,
        ...pendlePrices.breakdown,
      },
    };
  });

  const lpBreakdown = lpData.then(({ breakdown }) => breakdown);
  const lpPrices = lpData.then(({ prices }) => prices);

  await tokenPrices;
  await lpData;

  return {
    tokenPrices,
    lpPrices,
    lpBreakdown,
  };
}

async function updateAmmPrices() {
  console.log('> updating amm prices');
  let start = Date.now();

  try {
    const {
      tokenPrices: tokenPricesPromise,
      lpPrices: lpPricesPromise,
      lpBreakdown: lpBreakdownPromise,
    } = await performUpdateAmmPrices();

    const [tokenPrices, lpPrices, lpBreakdowns] = await Promise.all([
      tokenPricesPromise,
      lpPricesPromise,
      lpBreakdownPromise,
    ]);

    if (addToCache(tokenPrices, lpPrices, lpBreakdowns)) {
      clearCacheOracles(); // Delete specific oracleIds
      await saveToRedis();
    }

    console.log(`> updated amm prices  (${(Date.now() - start) / 1000}s)`);
  } catch (err) {
    console.error(`> error updating amm prices (${(Date.now() - start) / 1000}s)`, err.message);
  } finally {
    setTimeout(updateAmmPrices, REFRESH_INTERVAL);
  }
}

export async function getAmmTokensPrices() {
  await serviceEventBus.waitForFirstEvent('prices/tokens/updated');
  return cachedTokenPrices;
}

export async function getAmmLpPrices() {
  await serviceEventBus.waitForFirstEvent('prices/lps/updated');
  return cachedLpPrices;
}

export async function getAmmAllPrices() {
  await serviceEventBus.waitForFirstEvent('prices/updated');
  return cachedAllPrices;
}

export async function getLpBreakdown() {
  await serviceEventBus.waitForFirstEvent('prices/lp-breakdowns/updated');
  return cachedLpBreakdowns;
}

export async function getLpBreakdownForOracle(oracleId: string) {
  const breakdowns = await getLpBreakdown();
  return breakdowns[oracleId];
}

export async function getAmmTokenPrice(
  oracleId: string,
  withUnknownLogging: boolean | string = false
): Promise<number | undefined> {
  const tokenPrices = await getAmmTokensPrices();
  if (tokenPrices.hasOwnProperty(oracleId)) {
    return tokenPrices[oracleId];
  }

  if (withUnknownLogging) {
    console.warn(
      `Unknown oracleId '${oracleId}' in tokens oracle. ${
        withUnknownLogging === true ? 'Consider adding it to .json file' : withUnknownLogging
      }`
    );
  }
}

export async function getAmmLpPrice(
  oracleId: string,
  withUnknownLogging: boolean | string = false
): Promise<number | undefined> {
  const lpPrices = await getAmmLpPrices();
  if (lpPrices.hasOwnProperty(oracleId)) {
    return lpPrices[oracleId];
  }

  if (withUnknownLogging) {
    console.warn(
      `Unknown oracleId '${oracleId}' in lps oracle. ${
        withUnknownLogging === true ? 'Consider adding it to .json file' : withUnknownLogging
      }`
    );
  }
}

export async function getAmmPrice(
  oracleId: string,
  withUnknownLogging: boolean | string = false
): Promise<number | undefined> {
  const allPrices = await getAmmAllPrices();
  if (allPrices.hasOwnProperty(oracleId)) {
    return allPrices[oracleId];
  }

  if (withUnknownLogging) {
    console.warn(
      `Unknown oracleId '${oracleId}' in any oracle. ${
        withUnknownLogging === true ? 'Consider adding it to .json file' : withUnknownLogging
      }`
    );
  }
}

// We want to treat wrapped tokens the same way we'd treat normal ones => We then swap all wrapped token oracleIds to their underlying
function normalizePoolOracleIds(pools) {
  const wrappedNativeTokens = new Set(
    Object.values(addressBookByChainId).map(addressbook => addressbook.tokens.WNATIVE.oracleId)
  );

  pools.forEach(pool => {
    const fields = ['lp0', 'lp1'];
    fields.forEach(token => {
      if (wrappedNativeTokens.has(pool[token].oracleId)) {
        pool[token].oracleId = pool[token].oracleId.slice(1);
      }
    });
  });

  return pools;
}

function addTokenPricesToCache(tokenPrices: PricesById): boolean {
  let updated = false;

  for (const [token, price] of Object.entries(tokenPrices)) {
    if (isFiniteNumber(price)) {
      // TODO: add TTL so entries are removed eventually if not updated
      cachedTokenPrices[token] = price;
      cachedAllPrices[token] = price;
      updated = true;
    }
  }

  return updated;
}

function addLpPricesToCache(tokenPrices: PricesById): boolean {
  let updated = false;

  for (const [token, price] of Object.entries(tokenPrices)) {
    if (isFiniteNumber(price)) {
      // TODO: add TTL so entries are removed eventually if not updated
      cachedLpPrices[token] = price;
      cachedAllPrices[token] = price;
      updated = true;
    }
  }

  return updated;
}

function addLpBreakdownsToCache(lpBreakdowns: BreakdownsById): boolean {
  let updated = false;

  for (const [token, breakdown] of Object.entries(lpBreakdowns)) {
    if (
      breakdown !== undefined &&
      breakdown !== null &&
      typeof breakdown === 'object' &&
      'price' in breakdown
    ) {
      const price = breakdown.price;
      if (isFiniteNumber(price)) {
        // TODO: add TTL so entries are removed eventually if not updated
        cachedLpBreakdowns[token] = breakdown;
        updated = true;
      }
    }
  }

  return updated;
}

function addToCache(tokenPrices: PricesById, lpPrices: PricesById, lpBreakdowns: BreakdownsById): boolean {
  const tokenPriceUpdated = addTokenPricesToCache(tokenPrices);
  const lpPriceUpdated = addLpPricesToCache(lpPrices);
  const lpBreakdownUpdated = addLpBreakdownsToCache(lpBreakdowns);

  if (tokenPriceUpdated) {
    serviceEventBus.emit('prices/tokens/updated');
  }

  if (lpPriceUpdated) {
    serviceEventBus.emit('prices/lps/updated');
  }

  if (lpBreakdownUpdated) {
    serviceEventBus.emit('prices/lp-breakdowns/updated');
  }

  if (tokenPriceUpdated || lpPriceUpdated) {
    serviceEventBus.emit('prices/updated');
  }

  return tokenPriceUpdated || lpPriceUpdated || lpBreakdownUpdated;
}

export async function initPriceService() {
  // Load cache and update
  await loadFromRedis();
  await sleep(INIT_DELAY);
  await updateAmmPrices();
}

async function loadFromRedis() {
  const tokenPrices = await getKey<PricesById>('TOKEN_PRICES');
  const lpPrices = await getKey<PricesById>('LP_PRICES');
  const lpBreakdowns = await getKey<BreakdownsById>('LP_BREAKDOWN');

  addToCache(
    tokenPrices && typeof tokenPrices === 'object' ? tokenPrices : {},
    lpPrices && typeof lpPrices === 'object' ? lpPrices : {},
    lpBreakdowns && typeof lpBreakdowns === 'object' ? lpBreakdowns : {}
  );
}

function clearCacheOracles() {
  ORACLES_TO_BE_CLEARED.forEach(oracleId => {
    delete cachedTokenPrices[oracleId];
    delete cachedLpPrices[oracleId];
    delete cachedAllPrices[oracleId];
    delete cachedLpBreakdowns[oracleId];
  });
}

async function saveToRedis() {
  await setKey('TOKEN_PRICES', cachedTokenPrices);
  await setKey('LP_PRICES', cachedLpPrices);
  await setKey('LP_BREAKDOWN', cachedLpBreakdowns);
}
