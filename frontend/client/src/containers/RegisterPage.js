import { useState } from 'react';
import Layout from 'components/Layout';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const RegisterPage = () => {
  const { register } = useSelector(state => state.user);



  if (register)
    return <Navigate to='/login' />;
  
  return (
    <Layout title='Auth Site | Register' content='Register page'>
      <h1>Register for an Account</h1>
      <form>
        <div>
          <label htmlFor='first_name'>First Name</label>
          <input type='text' name='first_name' id='first_name' />
        </div>
        <div>
          <label htmlFor='last_name'>Last Name</label>
          <input type='text' name='last_name' id='last_name' />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' />
        </div>
      </form>
    </Layout>
  )
}

export default RegisterPage