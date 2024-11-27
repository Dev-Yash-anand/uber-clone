import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
  const [password, setPassword] = useState('')
  const [email, setemail] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [userData, setuserData] = useState({})

  const submitHandler = (e) => {+
    e.preventDefault()

    setuserData({
      fullname: {
        firstname,
        lastname
      },
      email,
      password
    })    

    setemail('')
    setPassword('')
    setfirstname('')
    setlastname('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <img className='w-16 ' src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n" alt="" />
      <div>
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
        <h3 className='text-base font-medium'>What's your name</h3>
        <div className='flex gap-4 mb-7'>
          <input
          className='bg-[#eeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-sm'
        required
        value={firstname}
        onChange={(e) => setfirstname(e.target.value)}
         type="text" 
        placeholder='First name'
        />
        <input
          className='bg-[#eeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-sm'
        required
        value={lastname}
        onChange={(e) => setlastname(e.target.value)}
         type="text" 
        placeholder='Last name'
        />
        </div>
        <h3 className='text-base font-medium'>What's your email</h3>
        <input
          className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
        required
        value={email}
        onChange={(e) => setemail(e.target.value)}
         type="email" 
        placeholder='abc@gmail.com'
        />
        <h3 className='text-base font-medium'>Enter password</h3>
        <input required
        className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password" />
        <button className='bg-black text-white mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
        <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600 font-semibold'>Login here</Link></p>
      </form>
      </div>
      <div>
        <p className='text-center text-[12px] leading-tight'>© 2023 Uber Technologies, Inc.</p>
      </div>
    </div>
  )
}

export default CaptainSignup
