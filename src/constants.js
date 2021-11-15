import Flags from 'country-flag-icons/react/3x2'
const currencies=[
    {
        name:'USD-US Dollar',
        commponent:()=>(<Flags.US className="w-8 h-4"/>),
        apiIndentifier:'USD'
    },
    {
        name:'EUR-Euro',
        commponent:()=>(<Flags.EU className="w-8 h-4"/>),
        apiIndentifier:'EUR'
    },
    {
        name:'GBP-British Pound',
        commponent:()=>(<Flags.GB className="w-8 h-4"/>),
        apiIndentifier:'GBP'
    },
    {
        name:'INR-Indian Rupee',
        commponent:()=>(<Flags.IN className="w-8 h-4"/>),
        apiIndentifier:'INR'
    },
    {
        name:'AUD-Australian Dollar',
        commponent:()=>(<Flags.AU className="w-8 h-4"/>),
        apiIndentifier:'AUD'
    },
    {
        name:'CAD-Canadian Dollar',
        commponent:()=>(<Flags.CA className="w-8 h-4"/>),
        apiIndentifier:'CAD'
    },
    {
        name:'CNY-Chinese Yuan',
        commponent:()=>(<Flags.CH className="w-8 h-4"/>),
        apiIndentifier:'CNY'
    },
    {
        name:'ZAR-South African Rand',
        commponent:()=>(<Flags.ZA className="w-8 h-4"/>),
        apiIndentifier:'ZAR'
    },
    {
        name:'JPY-Japanese Yen',
        commponent:()=>(<Flags.JP className="w-8 h-4"/>),
        apiIndentifier:'JPY'
    },
    {
        name:'CHF-Swiss Franc',
        commponent:()=>(<Flags.CH className="w-8 h-4"/>),
        apiIndentifier:'CHF'
    },   
    {
        name:'NZD-New Zealand Dollar',
        commponent:()=>(<Flags.NZ className="w-8 h-4"/>),
        apiIndentifier:'NZD'
    },

]
export default currencies