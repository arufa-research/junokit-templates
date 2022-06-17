const { Contract, getAccountByName, getLogs } = require("junokit");
//
async function run() {
    const runTs = String(new Date());
    const contract_owner = getAccountByName("account_0");
    const other = getAccountByName("account_1");
    const erc_20_contract = new Contract("cw-erc20");
    await erc_20_contract.setUpclient();
    await erc_20_contract.parseSchema();

    console.log("Client setup done!! ");

    const deploy_response = await erc_20_contract.deploy(
        contract_owner,
        { // custom fees
            amount: [{ amount: "900000", denom: "ujunox" }],
            gas: "35000000",
        }
    );
    console.log(deploy_response);
    
    const contract_info = await erc_20_contract.instantiate(
        {
            "name": "ada",
            "symbol": "IDL",
            "decimals": 6,
            "initial_balances": [{
                "address": contract_owner.account.address,
                "amount": "2000000"
            }]
        },
        `deploy test ${runTs}`,
        contract_owner);
    console.log(contract_info);

    const inc_response = await erc_20_contract.tx.transfer(
        { account: contract_owner },
        {
            "recipient": "juno1njamu5g4n0vahggrxn4ma2s4vws5x4w3u64z8h",
            "amount": "1234560"
        }
    );
    console.log(inc_response);

    const response = await erc_20_contract.query.balance(
        { "address": other.account.address }
    );
    console.log(response);

}

module.exports = { default: run };
