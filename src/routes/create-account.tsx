import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Switcher, Title, Wrapper, Form, Error } from "../components/auth-components";
import axios from "axios";

export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        if(name === "name") {
            setUsername(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };


    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (isLoading || username === "" || email === "" || password === "") return;
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8080/api/v1/users/signup", {
                username,
                email,
                password,
              });
            if (response.status === 201) { // 성공적으로 생성되었을 때
                navigate("/"); // 회원가입 성공 후 리다이렉트
            } else {
                setError("Failed to create account. Please try again.");
            } 
        } catch (e) {
            setError("An error occurred during signup. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return( 
    <Wrapper>
        <Title>Join 𝕏</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="name" value={username} placeholder="Username" type="text" required />
            <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required />
            <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required />
            <Input type="submit" value={ isLoading ? "Loading..." : "Create Account"}/>
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
            Already have an account? <Link to="/login">Log in &rarr;</Link>
        </Switcher>
    </Wrapper>
    )
}