import { useState } from 'react';
import Layout from 'components/Layout';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from 'features/user';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { register, loading } = useSelector(state => state.user);

  const [ formData, setFormData ] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const { first_name, last_name, email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = e => {
    e.preventDefault();
    dispatch(register({ first_name, last_name, email, password }));
  }


  if (register)
    return <Navigate to='/login' />;
  
  return (
    <Layout title='Auth Site | Register' content='Register page'>
      <h1>Register for an Account</h1>
      <form className="mt-5">
        <div className="form-group">
          <label htmlFor='first_name' className='form-label'>First Name</label>
          <input type='text' name='first_name' id='first_name' onChange={onChange} value={first_name} className="form-control" required/>
        </div>
        <div className="form-group mt-3">
          <label htmlFor='last_name' className='form-label'>Last Name</label>
          <input type='text' name='last_name' id='last_name' onChange={onChange} value={last_name} className="form-control" required/>
        </div>
        <div className="form-group mt-3">
          <label htmlFor='email' className='form-label'>Email</label>
          <input type='email' name='email' id='email' onChange={onChange} value={email} className="form-control" required/>
        </div>
        <div className="form-group mt-3">
          <label htmlFor='password' className='form-label'>Password</label>
          <input type='password' name='password' id='password' onChange={onChange} value={password} className="form-control" required/>
        </div>
				{loading ? (
					<div className='spinner-border text-primary' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				) : (
					<button className='btn btn-primary mt-4'>Register</button>
				)}
      </form>
    </Layout>
  )
}

export default RegisterPage