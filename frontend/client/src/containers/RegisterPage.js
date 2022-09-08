import { useState } from 'react';
import Layout from 'components/Layout';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const RegisterPage = () => {
  const { register } = useSelector(state => state.user);

  const [ formData, setFormData ] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const { first_name, last_name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  if (register)
    return <Navigate to='/login' />;
  
  return (
    <Layout title='Auth Site | Register' content='Register page'>
      <h1>Register for an Account</h1>
      <form>
        <div>
          <label htmlFor='first_name'>First Name</label>
          <input type='text' name='first_name' id='first_name' onChange={onChange} value={first_name}/>
        </div>
        <div>
          <label htmlFor='last_name'>Last Name</label>
          <input type='text' name='last_name' id='last_name' onChange={onChange} value={last_name}/>
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' onChange={onChange} value={email}/>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' onChange={onChange} value={password}/>
        </div>
      </form>
    </Layout>
  )
}

export default RegisterPage