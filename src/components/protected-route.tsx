import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
    children,
} : {
    children:React.ReactNode;
}) {
    // 여기서 사용자의 인증 상태를 확인합니다.
    const token = localStorage.getItem("accessToken");

    // 만약 토큰이 없다면 (즉, 사용자가 로그인하지 않았다면) 로그인 페이지로 리다이렉트
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}