import {useState,useEffect} from "react"
import { FaMoneyCheck,FaArrowCircleRight} from "react-icons/fa"
import axios from 'axios'
import currencies from './constants'

const SideBarIcon=({icon})=>{
  return (<div className="currency-icon">
      {icon}
  </div>
  )
}

const AmountEntry=(props)=>(
  <div className="amount">
    <input type="number" min="1" className="amount-input" placeholder="$1.00" onChange={props.baseCurrencyChanged}/>
  </div>
)

const Destination=(props)=>{
  return (<div className="destination">
    {props.amount} 
  </div>
  )
}

const DropDownEntry=(props)=>{
const [isOpen,setOpen]=useState(false)
const getDropdownClassName=()=>{
  return isOpen?
  `absolute  top-10 py-2 mt-2 bg-white bg-gray-100  rounded-md shadow-xl w-44 h-56 overflow-y-scroll`:
  `absolute hidden top-10 py-2 mt-2 bg-white bg-gray-100  rounded-md shadow-xl w-44`

}

const handleDropDown=()=>{
  setOpen(curr=>curr=!curr)
}
 
return (
  <div className="relative">
    <button 
    onClick={handleDropDown}
    className="flex items-center block p-2 bg-white bg-gray-100 rounded-md w-44">
      <span className="mr-4">
        {props.header} Currency
      </span>
      <svg className="w-5 h-5 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
        </svg>
    </button>
    <div className={getDropdownClassName()}>
      {currencies.map(currency=>{
        const FlagIcon=currency.commponent
       return (
        <div className="dropdown-item" onClick={()=>{
          if(props.type==="base")
            props.baseCurrencyHandler(currency)
          if(props.type==="to")
            props.toCurrencyHandler(currency)
          handleDropDown()
        }}>
        <FlagIcon/>
        {currency.name}
        </div>
      )
      })}
    </div>
  </div>
)
}
const App=()=>{
  const [exchangeRates,setExchangeRates]=useState([])
  const [baseCurrency,setBaseCurrency]=useState(currencies[0])
  const [toCurrency,setToCurrency]=useState(currencies[1])
  const [_,setBaseAmount]=useState(0)
  const [toAmount,setToAmount]=useState(0)

  const fetchExachangeRates=async()=>{
    const baseUrl=`https://freecurrencyapi.net/api/v2/latest?apikey=9dd130f0-45e2-11ec-9991-bd23327e06b6&base_currency=${baseCurrency.apiIndentifier}`
    const response=await axios.get(
      baseUrl
    )
    console.log({response})
    setExchangeRates(currRates=>currRates=response.data)
  }
  useEffect(
    ()=>{
      fetchExachangeRates()
    },[baseCurrency.name]
  )

  const setBaseCurrencyHandler=(currency)=>{
    setBaseCurrency(current=>current=currency)
  }
  const setToCurrencyHandler=(currency)=>{
    setToCurrency(current=>current=currency)
  }
  const baseCurrencyChanged=(e)=>{
    const baseValue=e.target.value
    const destinationRate=exchangeRates.data[toCurrency.apiIndentifier]
    const destnationAmount=destinationRate*baseValue
    setToAmount(curr=>curr=destnationAmount)
    setBaseAmount(e.target.value)
  }
  const getExchangeQuote=()=>{
    
        return exchangeRates.data ?`1.00 ${baseCurrency.name} =
        ${exchangeRates.data[toCurrency.apiIndentifier]} ${toCurrency.name} \n
        1 ${toCurrency.name}  = ${1 /exchangeRates.data[toCurrency.apiIndentifier] } ${baseCurrency.name}`
        : `Fetching Data`
  }
  return (
    <div className="container w-screen h-screen flex  flex-col items-center  bg-gray-500">
      <div className="w-full h-16 m-0 flex flex-row items-center justify-evenly bg-gray-200 shadow-lg">
        <h1>Currency Converter</h1>
      </div>
      <div className="container w-3/4 h-3/4 mx-auto mt-8 bg-white rounded-lg shadow-xl ">
        <div className="flex flex-row justify-start items-center p-6">
          <div className="text-lg text-gray-500 font-semibold text-opacity-80">Convert</div>
          <SideBarIcon className="ml-4" icon={<FaMoneyCheck size="24" color="blue"/>}/>
          </div>
        <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-start p-6">
          <div>
            Amount  {baseCurrency?baseCurrency.apiIndentifier:'null'}
          </div>
          <AmountEntry  baseCurrencyChanged={baseCurrencyChanged}/>
        </div>
        <div className="flex flex-col justify-start p-6">
          <div>
            Amount {toCurrency?toCurrency.apiIndentifier:'null'}
          </div>
          <Destination amount={toAmount.toFixed(3)}/>
        </div>
        </div>
        <div className="flex flex-row">
        <div className="flex flex-col justify-start p-6">
          <div>
            From 
          </div>
         < DropDownEntry type={"base"} header={baseCurrency.apiIndentifier} baseCurrencyHandler={setBaseCurrencyHandler}/>
        </div>
        <div>
          <SideBarIcon className="ml-4" icon={<FaArrowCircleRight size="24" color="blue"/>}/>
        </div>
        <div className="flex flex-col justify-start p-6">
          <div>
            To 
          </div>
         < DropDownEntry type={"to"} header={toCurrency.apiIndentifier} toCurrencyHandler={setToCurrencyHandler}/>
        </div>
        </div>
        <div className="text-center text-2xl text-gray-600">
        {
          getExchangeQuote()
        }
        </div>
      </div>
  </div>)
}

export default App