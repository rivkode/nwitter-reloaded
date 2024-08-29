import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Post from "./Post";
import api from "../utils/api"


export interface IPost {
    photo?: string;
    content: string;
    postToken?: string;
    username?: string;
    createdAt?: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function TimeLine() {
    const host = "http://localhost:8080"
    const [posts, setPosts] = useState<IPost[]>([]);

    const fetchTweets = async() => {
        const response = await api.get(host + "/api/v1/posts");
        // const response = await axios.get(host + "/api/v1/posts");
        const { postList } = response.data; // response.data에서 postList를 추출
        setPosts(postList); // postList를 상태에 저장
    }
    useEffect(() => {
        fetchTweets();
    }, [])
    return(
        <Wrapper>
            {posts.map((post, index) => (
                <Post 
                  key={index} 
                  username={post.username || "Anonymous"} 
                  photo={post.photo} 
                  content={post.content}
                />
            ))}
        </Wrapper>
    );
}