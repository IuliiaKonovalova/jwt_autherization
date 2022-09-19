import { userSelector } from 'react-redux';
import Layout from 'components/Layout';

const DashboardPage = () => {
  return (
    <Layout title='Auth Site | Dashboard' content='Dashboard page'>
      {/* check the status */}
      {loading || user === null? (
        <div className='spinner-border text-primary' role='status'>
          <span className='sr-only'>Loading...</span>
          </div>
      ) : (
        <>
          <h1>Dashboard</h1>
          <p>User Details</p>
          <ul>
            <li>First Name: {user.first_name}</li>
            <li>Last Name: {user.last_name}</li>
            <li>Email: {user.email}</li>
          </ul>
        </>
      )}
    </Layout>
  )
}

export default DashboardPage