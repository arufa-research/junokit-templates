import { getAccountByName } from "junokit";

import { FactorialContract } from "../artifacts/typescript_schema/Factorial";

async function run() {
  const runTs = String(new Date());
  const contract_owner = getAccountByName("account_0");
  const counter_contract = new FactorialContract();
  await counter_contract.setUpclient();

  console.log("Client setup done!! ");

  const deploy_response = await counter_contract.deploy(
    contract_owner,
    { // custom fees
      amount: [{ amount: "900000", denom: "ujunox" }],
      gas: "35000000",
    }
  );
  console.log(deploy_response);
  const contract_info = await counter_contract.instantiate(
    {
      "factorial": 5
    }, `deploy test ${runTs}`, contract_owner);
  console.log(contract_info);

  const inc_response = await counter_contract.factorial(
    {account: contract_owner},
    {
      "number": 4
    });
  console.log(inc_response);
}

module.exports = { default: run };
