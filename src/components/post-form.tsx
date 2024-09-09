import { useEffect, useState } from "react";
import { styled } from "styled-components";
import api from "../utils/api";
import { IPost } from "./timeline";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background-color: black;
    width: 100%;
    resize: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
        sans-serif;
    &::placeholder {
        font-size: 16px;
    }
    &:focus {
        outline: none;
        border-color: #1d9bf0;
    }
`;

const AttachFileButton = styled.label`
    padding: 10px 0px;
    color: #1d9bf0;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #1d9bf0;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`;

const AttachFileInput = styled.input`
    display: none;
`;

const SubmitBtn = styled.input`
    background-color: #1d9bf0;
    color: white;
    border:none;
    padding: 10px 0px;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    &:hover,
    &:active {
        opacity: 0.8;
    }
`;

interface PostFormProps {
    setTemp: React.Dispatch<React.SetStateAction<boolean>>;
  }


export default function PostForm({ setTemp }: PostFormProps) {
    const host = "http://localhost:8080"
    const [isLoading, setLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState<File|null>(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value);
        
    }
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if (files && files.length == 1) {
            setFile(files[0]);
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading || tweet === "" || tweet.length > 150) return;
        // await
        const response = await api.post(host + "/api/v1/posts", {
            content: tweet
        });
        // form 에 있는 글자 없애기
        setTweet("");
        setTemp(true);  

        if (response.status == 201) {
            setTemp(true);  // setTemp 함수를 호출해 상태 변경
            console.log("success");
        } else {
            console.log("fail");
        }
        try {
            setLoading(true);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }

    }

    return <Form onSubmit={onSubmit}>
        <TextArea rows={5} maxLength={150} onChange={onChange} value={tweet} placeholder="What is happening ?" />
        <AttachFileButton htmlFor="file">{file ? "Photo added ✅" : "Add Photo"}</AttachFileButton>
        <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*"></AttachFileInput>
        <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post Tweet"}/>
    </Form>
}