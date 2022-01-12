import './multiForm.css';
import { useState } from 'react';

function MultiForm() {
  const array = { name: '', email: '', birthday: '', password: '' };
  const arr = [
    { type: 'text', btn: 'next', btnBack: false, cap: 'name' },
    { type: 'email', btn: 'next', btnBack: true, cap: 'email' },
    { type: 'date', btn: 'next', btnBack: true, cap: 'birthday' },
    { type: 'password', btn: 'submit', btnBack: true, cap: 'password' },
  ];

  const [formData, setFormData] = useState(array);
  const [activeForm, setActiveForm] = useState(0);

  const handleClick = (data, e) => {
    e.preventDefault();

    if (data === 'next') {
      setActiveForm(activeForm + 1);
    } else {
      console.log(formData);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setActiveForm(activeForm - 1);
  };

  console.log(formData);
  return (
    <div className="App">
      <form action="" className="forms">
        {arr[activeForm].btnBack && (
          <button onClick={(e) => handleBack(e)} className="backButton">
            Back
          </button>
        )}
        <input
          type={arr[activeForm].type}
          placeholder={arr[activeForm].cap}
          value={formData[arr[activeForm].cap]}
          onChange={(e) =>
            setFormData({
              ...formData,
              [`${arr[activeForm].cap}`]: e.target.value,
            })
          }
        />
        <button onClick={(e) => handleClick(arr[activeForm].btn, e)}>
          {arr[activeForm].btn}
        </button>
      </form>

      <div className="successSubmit"></div>
    </div>
  );
}

export default MultiForm;
