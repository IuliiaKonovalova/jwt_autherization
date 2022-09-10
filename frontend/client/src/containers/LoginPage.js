import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetRegistered } from 'features/user';
import Layout from 'components/Layout';

const LoginPage = () => {
  const dispatch = useDispatch();


	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		if (registered) dispatch(resetRegistered());
	}, [registered]);

	const { email, password } = formData;


  return (
    <Layout title='Auth Site | Login' content='Login page'>
      <h1>LoginPage</h1>
    </Layout>
  )
}

export default LoginPage