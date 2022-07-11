import { use } from "chai";
import { getAccountByName, junokitChai } from "junokit";

import { CounterContract } from "../artifacts/typescript_schema/Counter";
import { FactorialContract } from "../artifacts/typescript_schema/Factorial";

use(junokitChai);

describe("contracts-test", () => {

  async function setup() {
    const contract_owner = getAccountByName("account_0");
    const other = getAccountByName("account_1");
    const counter_contract = new CounterContract();
    await counter_contract.setUpclient();
    const factorial_contract = new FactorialContract();
    await factorial_contract.setUpclient();

    return { contract_owner, other, counter_contract, factorial_contract };
  }

  it("deploy and init", async () => {
    const runTs = String(new Date());
    const { contract_owner, other, counter_contract, factorial_contract } = await setup();
    const deploy_response = await counter_contract.deploy(
      contract_owner,
      { // custom fees
        amount: [{ amount: "900000", denom: "ujunox" }],
        gas: "35000000",
      }
    );
    const deploy_response_1 = await factorial_contract.deploy(
      contract_owner,
      { // custom fees
        amount: [{ amount: "900000", denom: "ujunox" }],
        gas: "35000000",
      }
    );
    console.log(deploy_response_1);
    console.log(deploy_response);
    const contract_info = await counter_contract.instantiate(
      {
        "count": 102
      }, `deploy test ${runTs}`, contract_owner);
    console.log(contract_info);
    const contract_inf = await factorial_contract.instantiate(
      {
        "factorial": 5
      }, `deploy test ${runTs}`, contract_owner);
    console.log(contract_inf);
  });
});
