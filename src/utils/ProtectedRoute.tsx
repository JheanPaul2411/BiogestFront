import { Navigate, Outlet } from "react-router-dom";

interface Props{
    canActivate:boolean,
    redirectPath:string
}
const ProtectedRoute = ({canActivate,redirectPath = '/'}:Props) => {
    if (!canActivate) {
        return <Navigate to={redirectPath} replace />
    }
    return <Outlet />;
}

export default ProtectedRoute;