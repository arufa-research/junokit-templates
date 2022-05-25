use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response,
    StdResult,
};

use crate::error::ContractError;
use crate::msg::{ ExecuteMsg, InstantiateMsg, QueryMsg, FactorialResponse};
use crate::state::{Constants, CONSTANTS};

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    let state = Constants {
        factorial: msg.factorial,
        owner: _info.sender.to_string()
    };
    CONSTANTS.save(deps.storage,&state)?;
    Ok(Response::new()
        .add_attribute("action", "initialisation")
        .add_attribute("sender", _info.sender.clone()))
}
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Factorial { number } => try_factorial(deps, env, info, number),
    }
}
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
           QueryMsg::GetFactorial {} => query_factorial(deps),
    }
}

fn try_factorial(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    number: i32
) -> Result<Response, ContractError> {
    let mut constant = CONSTANTS.load(deps.storage)?;
    let mut res = 1;
    let mut num = 1;
    while num <= number {
        res *= num;
        num += 1;
    }
    constant.factorial = res;
    CONSTANTS.save(deps.storage,&constant)?;
    Ok(Response::new()
        .add_attribute("action", "factorial stored successfully"))
}

pub fn query_factorial(_deps: Deps) -> StdResult<Binary> {
    let constant = CONSTANTS.load(_deps.storage)?;
    to_binary(&(FactorialResponse {factorial : constant.factorial}))
}
