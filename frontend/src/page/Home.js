import { Button, Container } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from 'react';
import { API_ENDPOINT } from '../constant/App';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
const Home = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get(`${API_ENDPOINT}/api/v1/posts`).then((response) => {
            if (response.status === 200 && response.data.status_code === 200) {
                const posts = response.data.results;
                setPosts(posts);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, [])
    return (
        <Container className='mt-5'>
            <Link to="/add-data" className='mb-5'>
                Add Post
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Data</th>
                        <th>Published At</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts && posts.map((post, index) => {
                            return (<tr key={post._id}>
                                <td>{++index}</td>
                                <td>{post?.title}</td>
                                <td>{post?.post_data}</td>
                                <td>{post?.createdAt?.split('T')?.[0]}</td>
                            </tr>)

                        })
                    }           </tbody>
            </Table>
        </Container>
    )
}
export default Home;