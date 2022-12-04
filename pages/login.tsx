import React, { useState,FormEvent	 } from 'react'
import useUser from 'lib/useUser'
import styles from 'styles/Login.module.css'
import fetchJson, { FetchError } from 'lib/fetchJson'

export default function Login() {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: '/admin',
    redirectIfFound: true,
  })
  const [errorMsg, setErrorMsg] = useState('')
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    }
    try {
                mutateUser(
                  await fetchJson('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                  })
                )
              } catch (error) {
                if (error instanceof FetchError) {
                  setErrorMsg(error.data.message)
                } else {
                  console.error('An unexpected error happened:', error)
                }
              }
            }
  return (
    <form onSubmit={onSubmit} className={styles.main}>
      <label>
        
        <input type="text" name="username" required placeholder='name'/>
        <input type="password" name="password" required placeholder='password'/>
      </label>
      <button type="submit">Login</button>
      {errorMsg && <p className="error">{errorMsg}</p>}
    </form>
    
  )
}
