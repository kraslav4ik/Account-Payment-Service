
import React from 'react';
import { Card } from 'antd';
import LoginForm from './LoginForm';


const LoginPage = () => (
  <>
    <Card
      title="Welcome to MyPaymentService. Please log in to start using application"
      style={{
        width: '50%', height: '50%', margin: 'auto', textAlign: 'center'
      }}
    >
        <LoginForm/>
    </Card>
  </>
);
export default LoginPage;