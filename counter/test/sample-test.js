const { use } = require("chai");
const { Contract, getAccountByName, trestleChai } = require("junokit");

use(junokitChai);

describe("erc-20", () => {

  async function setup() {
    const runTs = String(new Date());
  const contract_owner = getAccountByName("account_0");
  const other = getAccountByName("account_1");
  const counter_contract = new Contract("counter");
  await counter_contract.setUpclient();
  await counter_contract.parseSchema();

    return { contract_owner, other, contract };
  }

  it("deploy and init", async () => {
    const { contract_owner, other, contract } = await setup();
    const deploy_response = await counter_contract.deploy(
      contract_owner,
      { // custom fees
        amount: [{ amount: "90000", denom: "ujunox" }],
        gas: "35000000",
      }
    );
    console.log(deploy_response);
    const contract_info = await counter_contract.instantiate(
      {
        "count": 102
      }, `deploy test ${runTs}`, contract_owner);
    console.log(contract_info);
  });
});
