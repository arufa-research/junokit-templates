import React, { useEffect, useState } from 'react'
import { contractAddress } from '../../contracts/contactAddress';
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { API_URL } from '../../constants/constants';
import './Counter.css';

const Counter = () => {

    const [counterValue, setCounterValue] = useState(0);

    let queryClient:any;

    useEffect(()=>{
        const getClient = async()=>{
            queryClient = await CosmWasmClient.connect(API_URL);
        }
        getClient();
        getCount();
    },[]);

    const getCount = async()=>{
        // const queryClient = await CosmWasmClient.connect(API_URL);
        const queryCount = await queryClient?.queryContractSmart(
            contractAddress.at,
            {
               get_count:{} 
            }
        )
        console.log(queryCount);
        
    }

    const incrementCount = async()=>{
        // setCounterValue(counterValue+1);
         const incCount = await queryClient?.queryContractSmart(
            contractAddress.at,
            {
               increment:{} 
            }
        )
        console.log(incrementCount);
    }

  return (
    <div className='counter-container'>
        <div className='counter-status'>
            <div className='counter-count'>
                {counterValue}
            </div>
            <div className='counter-label'>
                CURRENT COUNT
            </div>
        </div>
        <div className='counter-increment'>
            <div className='inc-btn-wrapper'>
                <button onClick={()=>setCounterValue(counterValue+1)}>Increase count</button> 
            </div>
        </div>
    </div>
  )
}

export default Counter