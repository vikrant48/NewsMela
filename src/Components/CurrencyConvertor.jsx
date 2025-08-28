import { useState, useEffect } from 'react'
import usecurrencyInfo from '../Custum_Hook/useCurrencyInfo'

function CurrencyConvertor() {
    const [from, setfrom] = useState('USD')
    const [to, setTo] = useState('INR')
    const [fromVal, setFromval] = useState(0)
    const [toVal, setToval] = useState(0)
    const [iscurrcardvisible, setiscurrcardvisible] = useState(false)
    // console.log(from)
    // console.log(to)
    // console.log(fromVal)
    // console.log(toVal)

    // const currencyInfo = usecurrencyInfo(from,live)
    // const currencycods = usecurrencyInfo(from, list)

    // // Storing all keys in an array
    // const currencyKeys = Object.keys(currencycods);
    // console.log(currencyKeys)
    const currencyCodes = [
        "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL",
        "BSD", "BTC", "BTN", "BWP", "BYN", "BYR", "BZD", "CAD", "CDF", "CHF", "CLF", "CLP", "CNY", "CNH", "COP", "CRC", "CUC", "CUP", "CVE", "CZK",
        "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD",
        "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW",
        "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU",
        "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG",
        "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD", "STD", "SVC", "SYP", "SZL",
        "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VEF", "VES", "VND", "VUV", "WST", "XAF",
        "XAG", "XAU", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMK", "ZMW", "ZWL"
    ];

    const currencyInfo = usecurrencyInfo(from)

    const key = `${from}${to}`;

    useEffect(() => {
        const convert = () => {
            if (currencyInfo && currencyInfo[key]) {
                setToval(fromVal * currencyInfo[key]);
            }
        };
        convert();
    }, [fromVal, from, to, currencyInfo, key]);
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 max-w-md mx-auto">
            <button onClick={() => setiscurrcardvisible(true)} className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Currency Convertor
            </button>
            {iscurrcardvisible && (
                <div className="mt-6 space-y-6 relative">
                    <button
                        className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold z-10"
                        onClick={() => setiscurrcardvisible(false)}
                    >
                        &times;
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Currency Convertor</h1>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="from-currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">From Currency:</label>
                            <select
                                id="from-currency"
                                value={from}
                                onChange={(e) => { setfrom(e.target.value) }}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200">
                                {currencyCodes.map((code) => (
                                    <option key={code} value={code}>
                                        {code}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                            <input
                                type="number"
                                value={fromVal}
                                onChange={(e) => { setFromval(e.target.value) }}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                                placeholder="Enter amount"
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="to-currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">To Currency:</label>
                            <select
                                id="to-currency"
                                value={to}
                                onChange={(e) => { setTo(e.target.value) }}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200">
                                {currencyCodes.map((code) => (
                                    <option key={code} value={code}>
                                        {code}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Converted Amount</label>
                            <input
                                type="number"
                                value={toVal}
                                onChange={(e) => { setToval(e.target.value) }}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default CurrencyConvertor