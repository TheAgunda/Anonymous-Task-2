import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { API_ENDPOINT } from '../constant/App';
import { useNavigate } from 'react-router-dom';
const PostForm = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const initialState = {
        title: "",
        post_data: ""
    }
    const [formInputs, setFormInputs] = useState(initialState);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API_ENDPOINT}/api/v1/posts`, formInputs, {
            headers: {
                'x-access-token': auth.accessToken
            }
        }).then((response) => {
            if (response.status === 200 && response.data.status_code === 200) {
                navigate('/');
            }
        }).catch((error) => {

        })
    }
    return (
        <Container className='mt-5'>
            <Row className='justify-content-center'>
                <Col md={6} >
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formPostTitle">
                            <Form.Label>Post Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" required={true} value={formInputs.title} onChange={(e) => setFormInputs({ ...formInputs, title: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPostData">
                            <Form.Label>Post Data</Form.Label>
                            <Form.Control type="text" placeholder="Enter post data" value={formInputs.post_data} onChange={(e) => setFormInputs({ ...formInputs, post_data: e.target.value })} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col></Row></Container>
    );

}

export default PostForm;