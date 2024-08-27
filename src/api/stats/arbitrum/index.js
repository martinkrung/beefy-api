const { getCurveApys } = require('./getCurveApys');
const { getCurveLendApys } = require('./getCurveLendApys');
const { getSpellApys } = require('./getSpellApys');
const getBalancerArbApys = require('./getBalancerArbApys');
const getStargateArbApys = require('./getStargateArbApys');
const { getGmxV2Apys } = require('./getGmxV2Apys');
const { getGmxApys } = require('./getGmxApys');
const { getHopApys } = require('./getHopApys');
const { getConvexApys } = require('./getConvexApys');
const { getGnsApys } = require('./getGnsApys');
const getSolidLizardApys = require('./getSolidLizardApys');
const getRamsesApys = require('./getRamsesApys');
const getAuraArbitrumApys = require('./getAuraArbitrumApys');
const { getJoeAutoArbApys } = require('./getJoeAutoArbApys');
const getMerklGammaApys = require('./getMerklGammaApys');
const getUniswapGammaApys = require('./getUniswapGammaApys');
const { getArbCompoundV3Apys } = require('./getArbCompoundV3Apys');
const { getArbSiloApys } = require('./getArbitrumSiloApys');
const { getEquilibriaApys } = require('../common/getEquilibriaApys');
const { getBeefyArbCowApys } = require('./getBeefyArbCowApys');
const { getAaveV3Apys } = require('./getAaveV3Apys');
const { getPenpieApys } = require('./getPenpieApys');

const getApys = [
  getArbSiloApys,
  getMerklGammaApys,
  getUniswapGammaApys,
  // getJoeAutoArbApys,
  getAuraArbitrumApys,
  getGnsApys,
  getHopApys,
  () => getEquilibriaApys(require('../../../data/arbitrum/equilibriaPools.json')),
  getPenpieApys,
  getGmxV2Apys,
  getGmxApys,
  getCurveApys,
  getCurveLendApys,
  getConvexApys,
  getSpellApys,
  getBalancerArbApys,
  getStargateArbApys,
  getSolidLizardApys,
  getRamsesApys,
  getArbCompoundV3Apys,
  getBeefyArbCowApys,
  getAaveV3Apys,
];

const getArbitrumApys = async () => {
  const start = Date.now();
  let apys = {};
  let apyBreakdowns = {};

  let promises = [];
  getApys.forEach(getApy => promises.push(getApy()));
  const results = await Promise.allSettled(promises);

  for (const result of results) {
    if (result.status !== 'fulfilled') {
      console.warn('getArbitrumApys error', result.reason);
      continue;
    }

    // Set default APY values
    let mappedApyValues = result.value;
    let mappedApyBreakdownValues = {};

    // Loop through key values and move default breakdown format
    // To require totalApy key
    for (const [key, value] of Object.entries(result.value)) {
      mappedApyBreakdownValues[key] = {
        totalApy: value,
      };
    }

    // Break out to apy and breakdowns if possible
    let hasApyBreakdowns = 'apyBreakdowns' in result.value;
    if (hasApyBreakdowns) {
      mappedApyValues = result.value.apys;
      mappedApyBreakdownValues = result.value.apyBreakdowns;
    }

    apys = { ...apys, ...mappedApyValues };

    apyBreakdowns = { ...apyBreakdowns, ...mappedApyBreakdownValues };
  }

  const end = Date.now();
  console.log(`> [APY] Arbitrum finished updating in ${(end - start) / 1000}s`);

  return {
    apys,
    apyBreakdowns,
  };
};

module.exports = { getArbitrumApys };
