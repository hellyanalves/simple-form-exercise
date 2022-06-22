import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import './App.css';
import React, { useState, useRef, forwardRef } from 'react';

const countries = [
  { title: 'Brasil', id: 1 },
  { title: 'Mexico', id: 2 }
];

function EmailTextEdit() {
  return (    
    <div class="form-group row">
      <label htmlFor="email" class="col-form-label">Email</label>
      <input class="form-control" type="text" name="email" placeholder="example@email.com"/>
    </div>
  );
}

const CountrySelect = forwardRef(
  function CountrySelectInput(props, ref){
    return(
      <div class="form-group row">
      <label htmlFor="countrySelect" class="col-form-label">Select your country</label>
      <select name="country" id="countrySelect" onChange={props.handleSelect} ref={ref} value={props.countryCode}>
        <option value='+55'>Brasil</option>
        <option value='+52'>Mexico</option>
      </select>
    </div>
    )
  }
)


const PhoneNumber = forwardRef(
  function PhoneNumberInput(props, ref) {
    return (
        <div class="form-group row">
          <label htmlFor="phoneNumber" class="col-form-label">Phone Number</label>

          <input type="tel" class="form-control" placeholder="Enter phone number" name="phoneNumber"  ref={ref} value={props.countryCode}/>
        </div>
    )
  }
)

function SubmitFormButton() {
  return ( 
    <button type="submit"class="btn btn-primary">Register</button>
  );
}

function Form(){  
  const phoneRef = useRef(null);
  const countryRef = useRef(null);
  const [country, setCountry] = useState(undefined);

  function handleSubmit(e) {
    e.preventDefault();
    alert('You clicked submit!');
  }

  function handleCountryChanged(e) {
    alert('country selected')
    console.log(phoneRef.current);
    console.log(countryRef.current);
    phoneRef.current.value= countryRef.current.value;
  }

  function handleCountryChangedState(e) {
    alert('country selected')
    setCountry(e.target.value);
  }

  return (
    <h1>Register into my awesome system</h1>,
    <form onSubmit={handleSubmit}>
      <CountrySelect handleSelect={handleCountryChangedState} ref={countryRef} countryCode={country}/>
      <PhoneNumber ref={phoneRef} countryCode={country}/>
      <EmailTextEdit/>
      <SubmitFormButton/>
    </form>
  )
}

function App() {
  return (
    <div className="container">
      <div  class="row">
        <h1>Register into my amazing app</h1>
      </div>
      <div class="row">
        <Form />
      </div>
    </div>
  );
}

export default App;
