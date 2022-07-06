import { use } from "chai";
import { getAccountByName, junokitChai } from "junokit";

import { FactorialContract } from "../artifacts/typescript_schema/Factorial";

use(junokitChai);

describe("factorial", () => {

  async function setup() {
    const contract_owner = getAccountByName("account_0");
    const contract = new FactorialContract;
    await contract.setUpclient();

    return { contract_owner, contract };
  }

  it("deploy and init", async () => {
    const { contract_owner, contract } = await setup();
    const deploy_response = await contract.deploy(contract_owner);
    console.log(deploy_response);

    const contract_info = await contract.instantiate(
      {
        "factorial": 5
      },
      "deploy test",
      contract_owner
    );
    console.log(contract_info);
  });
});
