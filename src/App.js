import React, {useState } from 'react'
import './App.css'
import bmi from './utils/bmi.png'

const App = () => {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmiVal, setBMIVal] = useState('')
  const [status, setStatus] = useState('')
  const [quotes, setQuotes] = useState('')
  const [error, setError] = useState(false)


  const calculateBMI = (weight, height) => {
    if (weight <= 0 || height <= 0) {
      setError(true)
      return 0;
    }

    const BMI = weight / ((height / 100) ** 2);
    setBMIVal(parseFloat(BMI.toFixed(2)))

    if (BMI < 18.5) {
      setStatus('Underweight');
      setQuotes(<q>Healthy weight, healthy life.</q>)
    } else if (BMI >= 18.5 && BMI < 25) {
      setStatus('Normal weight');
      setQuotes(<q>Balance is key to health.</q>)
    } else if (BMI >= 25 && BMI < 30) {
      setStatus('Overweight');
      setQuotes(<q>Small changes, big impact.</q>)
    } else {
      setStatus('Obese');
      setQuotes(<q>Health is worth it.</q>)
    }
  }

  const handleForm = (e) => {
    e.preventDefault()
    calculateBMI(weight, height)
  }

  const handleClear = () => {
    setHeight('');
    setWeight('');
    setBMIVal('');
    setStatus('');
    setError(false);
    setQuotes('Healthy choices, happy life.')
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="bmi_body">
            <div className="row">
              <div className="col-md-6">
                <img src={bmi} alt="BMI" className='bmiimage' />
              </div>
              <div className="col-md-6">
                <div className='calc_body'>
                  <div className="heading">BMI CALCULATOR <hr />
                  </div>
                  <form onSubmit={handleForm}>
                    <input
                      type="text"
                      placeholder='Weight in Kg'
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    /><br />
                    <input
                      type="text"
                      placeholder='Height in Cm'
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    /><br />
                    <button type='submit'>Get BMI</button>
                    <button type='button' onClick={handleClear} className='clearbtn'>Clear</button>
                  </form>
                  {error && <div className="error">Please enter valid weight and height</div>}
                  <div className="calc_ans">
                    <div className="bmiis">Your BMI is <b>{bmiVal || 0}</b></div>
                    <div className="bmist">Status is <b>{status || '___'}</b></div>
                    <div className="bmiqu"><b>{quotes ?  quotes : 'Healthy choices, happy life.'}</b></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  )
}

export default App