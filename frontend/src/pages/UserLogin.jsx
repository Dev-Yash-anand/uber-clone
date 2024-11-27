import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()
    
    setUserData({
      email,
      password
    })
    
    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <img className='w-16 ' src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n" alt="" />
      <div>
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
        <h3 className='text-lg font-medium'>What's your email</h3>
        <input
          className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        required
        value={email}
        onChange={(e) => {
              setEmail(e.target.value)
        }}
         type="email" 
        placeholder='abc@gmail.com'
        />
        <h3 className='text-lg font-medium'>Enter password</h3>
        <input required
        className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        placeholder='password'
        value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
        type="password" />
        <button className='bg-black text-white mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
        <p className='text-center'>New here? <Link to='/user-signup' className='text-blue-600 font-semibold'>Create new Account</Link></p>
      </form>
      </div>
      <div>
        <Link
          to={'/captain-login'}
          className='bg-[#10b461] flex items-center justify-center font-semibold text-white mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
