import { Card } from "antd";
import RegisterForm from "./RegisterForm";



const RegisterPage = () => (
    <>
      <Card
        title="Registration form"
        style={{
          width: '50%', height: '60%', margin: 'auto', textAlign: 'center'
        }}
      >
          <RegisterForm/>
      </Card>
    </>
);
export default RegisterPage;