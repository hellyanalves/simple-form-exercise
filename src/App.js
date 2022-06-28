import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import './App.css';
import React, { useState, useRef, forwardRef, useReducer } from 'react';

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

function Days(props) {
  const days = Array.from({length: 30}, (_, i) => i + 1);
  return (
    <select class="col-sm-2  form-control" type="select" name="birth-day" id="birth-day" onChange={props.handleBirthDateChanged}>
      {
        days.map(day =>
          <option key={day}>{day}</option>
        )
      }
    </select>
  );
}

function BirthDateEdit(props) {
  
  return (    
    <div class="form-group row">
      <label htmlFor="birth-year" class="col-form-label">Email</label>
      <select class="col-sm-2  form-control" type="select" name="birth-year" id="birth-year" onChange={props.handleYearChanged} value={props.birthDate.getYear()}>
        <option>1990</option>
        <option>1991</option>
      </select>
      <select class="col-sm-2 form-control" type="select" name="birth-month" id="birth-month" onChange={props.handleMonthChanged}>
        <option value='0'>Janeiro</option>
        <option value='1'>Fevereiro</option>
      </select>
      <Days handleBirthDateChanged={props.handleDayChanged}/>
    </div>
  );
}

function SubmitFormButton() {
  return ( 
    <button type="submit"class="btn btn-primary">Register</button>
  );
}

function Form(){  
  const phoneRef = useRef(null);
  const countryRef = useRef(null);
  const [country, setCountry] = useState(undefined);
  // const [birthDate, setBirthDate] = useState(new Date(1990,0,1));
  const [birthDate, dispatch] = useReducer(birthDateReducer, new Date(1990,0,1));

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

  /*
  function handleBirthDateChanged(e){
    console.log(birthDate);
    console.log(e.target.id);
    console.log(e.target.value);
    switch(e.target.id){
      case 'birth-year':
        setBirthDate(new Date(e.target.value, birthDate.getMonth(), birthDate.getDay()));
        break;
      case 'birth-month':
        setBirthDate(new Date(birthDate.getYear(), e.target.value, birthDate.getDay()));    
        break;
      case 'birth-day':
          setBirthDate(new Date(birthDate.getYear(), birthDate.getMonth(), e.target.value));    
          break;
      default:
        setBirthDate(birthDate);
    }
  }
  */

  function handleYearChanged(e){
    dispatch({
        type: 'year_changed',
        year: e.target.value
      })
  }
  
  function handleMonthChanged(e){
    dispatch({
        type: 'month_changed',
        month: e.target.value
      })
  }

  function handleDayChanged(e){
    dispatch({
        type: 'day_changed',
        day: e.target.value
      })
  }

  function birthDateReducer(birthDate, action){
    switch(action.type){
      case 'year_changed':
        return(new Date(action.year, birthDate.getMonth(), birthDate.getDay()));
      case 'month_changed':
        return(
          new Date(birthDate.getYear(), action.month, birthDate.getDay())
        );
      case 'day_changed':
        return(
          new Date(birthDate.getYear(), birthDate.getMonth(), action.day)
        ); 
      default:
        return(
          birthDate
          );
    }
  }

  console.log("Form ", birthDate);  
  return (
    <h1>Register into my awesome system</h1>,
    <form onSubmit={handleSubmit}>
      <CountrySelect handleSelect={handleCountryChangedState} ref={countryRef} countryCode={country}/>
      <PhoneNumber ref={phoneRef} countryCode={country}/>
      <EmailTextEdit/>
      <BirthDateEdit handleYearChanged={handleYearChanged} handleMonthChanged={handleMonthChanged} handleDayChanged={handleDayChanged} birthDate={birthDate}/>
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
