import { getAccountByName } from "junokit";

import { CounterContract } from "../artifacts/typescript_schema/Counter";
import { FactorialContract } from "../artifacts/typescript_schema/Factorial";

async function run() {
  const runTs = String(new Date());
  const contract_owner = getAccountByName("account_0");
  const other = getAccountByName("account_1");
  const counter_contract = new CounterContract;
  const factorial_contract = new FactorialContract;
  await counter_contract.setUpclient();
  await factorial_contract.setUpclient();

  console.log("Client setup done!! ");

  const deploy_response = await counter_contract.deploy(
    contract_owner,
    { // custom fees
      amount: [{ amount: "900000", denom: "ujunox" }],
      gas: "35000000",
    }
  );
  console.log(deploy_response);
  const deploy_response_1 = await factorial_contract.deploy(
    contract_owner,
    { // custom fees
      amount: [{ amount: "900000", denom: "ujunox" }],
      gas: "35000000",
    }
  );
  console.log(deploy_response_1);
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

  const inc_respons = await factorial_contract.factorial(
    {account: contract_owner},
    {
      "number": 4
    });
  console.log(inc_respons);
  const inc_response = await counter_contract.increment({account: contract_owner});
  console.log(inc_response);

  const response = await counter_contract.getCount();
  console.log(response);

}

module.exports = { default: run };
