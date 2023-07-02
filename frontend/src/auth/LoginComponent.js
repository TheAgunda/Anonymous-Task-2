import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { Col, Container, Row } from 'react-bootstrap';
import { API_ENDPOINT } from '../constant/App';
import axios from "axios";
function LoginComponent(props) {
    const { auth, setAuth } = useAuth();
    let navigate = useNavigate();
    const initialState = {
        email: "",
        password: "",
    }
    if (auth) {
        navigate('/')
    }
    const [formInputs, setFormInputs] = useState(initialState);
    useEffect(() => {

    }, [auth]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post(`${API_ENDPOINT}/api/v1/auth/login`, formInputs)
            .then((response) => {
                if (response.status === 200 && response.data.status_code === 200) {
                    const { refreshToken, ...results } = response.data.results;
                    localStorage.setItem("userData", JSON.stringify(results));
                    setAuth(results);
                    navigate('/');
                }
            }).catch((error) => {
                alert(error.response.data.message);
            });
    }
    return (
        <Container className='mt-5'>
            <Row className='justify-content-center'>
                <Col md={6} >
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required={true} value={formInputs.email} onChange={(e) => setFormInputs({ ...formInputs, email: e.target.value })} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required={true} value={formInputs.password} onChange={(e) => setFormInputs({ ...formInputs, password: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
export default LoginComponent;