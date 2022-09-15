import { getAccountByName, ExternalContract } from "junokit";

async function run() {
  const contract_owner = getAccountByName("account_0");
  const external = new ExternalContract("staked");
  await external.setUpclient();

  console.log("Client setup done!! ");

  // const res = await external.query("staked_value", { address: value.address });
  // console.log(res);
}

module.exports = { default: run };
