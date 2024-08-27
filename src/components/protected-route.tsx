import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
    children,
} : {
    children:React.ReactNode;
}) {

    const user = "";

    if (user == "") {
        return <Navigate to="/login" />;
    }
    return children;
}