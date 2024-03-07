import { Navigate, Outlet } from "react-router-dom";

interface Props{
    canActivate:unknown,
    redirectPath:string
}
const ProtectedRoute = ({canActivate,redirectPath = '/'}:Props) => {
    if (!canActivate) {
        window.location.href=redirectPath;
        return <Navigate to={redirectPath} replace />
    }
    return <Outlet />;
}

export default ProtectedRoute;