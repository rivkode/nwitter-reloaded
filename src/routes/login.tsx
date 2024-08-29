import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Switcher, Title, Wrapper, Error } from "../components/auth-components";
import axios from "axios";


export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };


    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (isLoading || email === "" || password === "") return;
        try {
            setLoading(true);
            // user login await 사용
            const response = await axios.post("http://localhost:8080/api/v1/users/login", {
                email,
                password,
              });
            if (response.status === 200) { // 성공적으로 생성되었을 때
                const authHeader = response.headers['authorization'];
                const userToken = response.headers['usertoken']; // 소문자로 접근
                if (authHeader) {
                    const accessToken = authHeader;

                    debugger
                    // 리다이렉트 실행 확인
                    console.log("Navigating to home page...");
                    // 토큰을 로컬 스토리지에 저장
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('userToken', userToken);
                }

                navigate("/"); // 로그인 성공 후 리다이렉트
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
        <Title>Log in 𝕏</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required />
            <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required />
            <Input type="submit" value={ isLoading ? "Loading..." : "Login"}/>
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
            Don't have an account? <Link to="/create-account">Create one &rarr;</Link>
        </Switcher>
    </Wrapper>
    )
}