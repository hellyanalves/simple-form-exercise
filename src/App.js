import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import CountrySelect from 'react-bootstrap-country-select';
import './App.css';
import React, { useState } from 'react';

function EmailTextEdit() {
  return (
    <label>
      <div class="form-group">
        Email
        <input type="text" name="email" />
      </div>
    </label>
  );
}

function PhoneNumberInput(){

  const [ value, setValue ] = useState(null);

  return (
    <label>
      
      <div class="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <CountrySelect 
          value={value}
          onChange={setValue}
          flags="true"
          placeholder="Brazil"/>
        <input placeholder="Enter phone number" name="phoneNumber" />
      </div>
    </label>
  )
}

function SubmitFormButton() {
  return (
    <button type="submit" value="Register" class="btn btn-primary"/>
  );
}

function Form(){  
  return (
    <h1>Register into my awesome system</h1>,
    <form>
      <PhoneNumberInput />
      <EmailTextEdit/>
      <SubmitFormButton/>
    </form>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Form />
      </header>
    </div>
  );
}

export default App;
