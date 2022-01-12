import './cryptoConvert.css';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const CryptoConvert = () => {
  const [cur, setCur] = useState('USD');
  const [wuc, setWuc] = useState(0);
  const [amount, setAmount] = useState(0);
  const [oldWuc, setOldWuc] = useState();
  let currency = ['USD', 'EUR', 'GBP', 'CNY', 'JPY'];

  const getCurrency = async (convertCurrency) => {
    try {
      const res = await axios.get(
        `https://api.frontendeval.com/fake/crypto/${convertCurrency}`
      );
      setOldWuc((wuc * amount).toFixed(2));
      setWuc(1 / res.data.value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrency(cur);
    setInterval(() => {
      getCurrency(cur);
    }, 10000);

    return () => clearInterval(cur);
  }, [cur]);

  return (
    <div className="cryptoWrap">
      <form action="">
        <input
          type="text"
          name="amount"
          id="cryptoAmount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          name="currency"
          id="currency"
          onChange={(e) => setCur(e.target.value)}
        >
          {currency.map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            );
          })}
        </select>
      </form>
      <div>{(wuc * amount).toFixed(2)}</div>
      {oldWuc && <div style={{ color: 'green' }}>{oldWuc}</div>}
    </div>
  );
};

export default CryptoConvert;
