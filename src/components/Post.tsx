import { styled } from "styled-components";
import { IPost } from "./timeline";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

export default function Post({ username, photo, content }: IPost) {
  // const host = "http://localhost:8080"
  // userToken을 가져온다.
  // 처음 로그인 할때 내 정보를 localStorage에 저장하자. 그래서 userToken을 가져올 수 있다.
  // 이 저장한 userToken을 통해 비교를 할 수 있다.
  // 삭제시 이 게시글의 작성자 userToken에 대한 정보는 ?
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{content}</Payload>
        <DeleteButton>Delete</DeleteButton>
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null}
    </Wrapper>
  );
}