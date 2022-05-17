//const { Contract, getAccountByName, getLogs } = require("juno-trestle");
//
//async function run() {
//  const runTs = String(new Date());
//  const contract_owner = getAccountByName("account_0");
//  const other = getAccountByName("account_1");
//  const counter_contract = new Contract("counter");
//  await counter_contract.setUpclient();
//  await counter_contract.parseSchema();
//
//  console.log("Client setup done!! ");
//
//  const deploy_response = await counter_contract.deploy(
//    contract_owner,
//    { // custom fees
//      amount: [{ amount: "90000", denom: "ujunox" }],
//      gas: "35000000",
//    }
//  );
//  console.log(deploy_response);
//  const contract_info = await counter_contract.instantiate(
//    {
//      "count": 102
//    }, `deploy test ${runTs}`, contract_owner);
//  console.log(contract_info);
//
//  const inc_response = await counter_contract.tx.increment({account: contract_owner});
//  console.log(inc_response);
//
//  const response = await counter_contract.query.get_count();
//  console.log(response);
//
//  // // const contract_addr = "secret76597235472354792347952394";
//  // // contract.instantiatedWithAddress(contract_addr);
//  // let balance_before = await contract.query.balance({ "address": contract_owner.account.address });
//  // console.log(balance_before);
//
//  // let transfer_response = await contract.tx.transfer(
//  //   { account: contract_owner },
//  //   {
//  //     recipient: other.account.address,
//  //     amount: "50000000"
//  //   }
//  // );
//  // console.log(transfer_response);
//
//  // let balance_after = await contract.query.balance({ "address": contract_owner.account.address });
//  // console.log(balance_after);
//}
//
//module.exports = { default: run };
