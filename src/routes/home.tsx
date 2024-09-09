import { styled } from "styled-components";
import PostForm from "../components/post-form";
import TimeLine from "../components/timeline";
import { useState } from "react";

const Wrapper = styled.div`
    display: grid;
    gap: 50px;
    overflow-y: scroll;
    grid-template-rows: 1fr 5fr;
`;

export default function Home() {

    const [temp, setTemp] = useState(false);

    return (
        <Wrapper>
            <PostForm setTemp={setTemp} />
            <TimeLine temp={temp} setTemp={setTemp}/>
        </Wrapper>
    )
}