import { useState, useEffect } from 'react'
import usecurrencyInfo from '../Custum_Hook/useCurrencyInfo'
import '../assets/currency_cnvrt.css'

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
    }, [fromVal, from, to, currencyInfo]);
    return (
        <div className="currency-container">
            <button onClick={() => setiscurrcardvisible(true)} className="check-currency-btn">
                Currency Convertor
            </button>
            {iscurrcardvisible && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setiscurrcardvisible(false)}>✖</button>
                        <h2 className="modal-heading" >currency convertor</h2>
                        <div className="currency-card">
                            <div>
                                <label className='label-head'>From</label>
                                <label htmlFor="currency">Select Currency:</label>
                                <select
                                    value={from}
                                    onChange={(e) => { setfrom(e.target.value) }}>
                                    {currencyCodes.map((code) => (
                                        <option key={code} value={code}>
                                            {code}
                                        </option>
                                    ))}
                                </select>
                                
                                <input
                                    type="number"
                                    value={fromVal}
                                    onChange={(e) => { setFromval(e.target.value) }}
                                />

                            </div>
                            <br />
                            <br />
                            <div>
                                <label className='label-head'>To</label>
                                <label htmlFor="currency">Select Currency:</label>
                                <select
                                    value={to}
                                    onChange={(e) => { setTo(e.target.value) }}>
                                    {currencyCodes.map((code) => (
                                        <option key={code} value={code}>
                                            {code}
                                        </option>
                                    ))}
                                </select>
                                
                                <input
                                    type="number"
                                    value={toVal}
                                    onChange={(e) => { setToval(e.target.value) }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default CurrencyConvertor