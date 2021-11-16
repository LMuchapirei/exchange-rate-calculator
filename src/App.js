import {useState,useEffect} from "react"
import { FaMoneyCheck,FaArrowCircleRight} from "react-icons/fa"
import axios from 'axios'
import currencies from './constants'

const IconContainer=({icon})=>{
  return (<div className="currency-icon">
      {icon}
  </div>
  )
}

const AmountEntry=(props)=>(
  <div className="amount">
    <input type="number" min="1" className="amount-input" placeholder="0.00" onChange={props.baseCurrencyChanged}/>
  </div>
)

const QuoteValue=(props)=>{
  return (<div className="quote-container m-4">
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
    className="flex items-center  p-2  bg-gray-100 rounded-md w-44">
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
        <div className="dropdown-item" 
        key={currency.apiIndentifier}
        onClick={()=>{
          if(props.type==="base")
            props.baseCurrencyHandler(currency)
          if(props.type==="to")
            props.quoteCurrencyHandler(currency)
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
  const [quoteCurrency,setQuoteCurrency]=useState(currencies[1])
  const [baseAmount,setBaseAmount]=useState(1)
  const [quoteAmount,setQouteAmount]=useState(1)

  const fetchExachangeRates=async()=>{
    const key=process.env.REACT_APP_API_KEY
    const baseUrl=`https://freecurrencyapi.net/api/v2/latest?apikey=${key}&base_currency=${baseCurrency.apiIndentifier}`
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
  const setQuoteCurrencyHandler=(currency)=>{
    setQuoteCurrency(current=>current=currency)
  }
  const baseCurrencyChanged=(e)=>{
    const baseValue=e.target.value
    const destinationRate=exchangeRates.data[quoteCurrency.apiIndentifier]
    const destnationAmount=destinationRate*baseValue
    setQouteAmount(curr=>curr=destnationAmount)
    setBaseAmount(e.target.value)
  }
  const getExchangeQuote=()=>{    
        return exchangeRates.data ?`1.00 ${baseCurrency.apiIndentifier} =
        ${exchangeRates.data[quoteCurrency.apiIndentifier]} ${quoteCurrency.apiIndentifier} and  1.00 ${quoteCurrency.apiIndentifier}  = ${(1 /exchangeRates.data[quoteCurrency.apiIndentifier]).toFixed(5) } ${baseCurrency.apiIndentifier}`
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
          <IconContainer className="ml-4" icon={<FaMoneyCheck size="24" color="blue"/>}/>
          </div>
        <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col justify-start items-start p-6">
          <div className="title-header">
            Amount  {baseCurrency?baseCurrency.apiIndentifier:'null'}
          </div>
          <AmountEntry  baseCurrencyChanged={baseCurrencyChanged}/>
        </div>
        <div className="flex flex-col justify-start items-start p-6">
          <div className="title-header">
            Amount {quoteCurrency?quoteCurrency.apiIndentifier:'null'}
          </div>
          <QuoteValue amount={quoteAmount.toFixed(5)}/>
        </div>
        </div>
        <div className="flex flex-row">
        <div className="flex flex-col justify-start p-6">
          <div className="title-header">
            From 
          </div>
         < DropDownEntry type={"base"} header={baseCurrency.apiIndentifier} baseCurrencyHandler={setBaseCurrencyHandler}/>
        </div>
        <div>
          <IconContainer className="ml-4" icon={<FaArrowCircleRight size="24" color="blue"/>}/>
        </div>
        <div className="flex flex-col justify-start p-6">
          <div className="title-header">
            To 
          </div>
         < DropDownEntry type={"to"} header={quoteCurrency.apiIndentifier} quoteCurrencyHandler={setQuoteCurrencyHandler}/>
        </div>
        </div>
        <div className="text-center p-6 text-xl font-semibold text-gray-600">
        {
          getExchangeQuote()
        }
        </div>
      </div>
  </div>)
}

export default App