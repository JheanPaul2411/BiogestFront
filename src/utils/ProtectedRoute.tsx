import { Navigate, Outlet } from "react-router-dom"

interface Props {
    canActive: boolean
    redirectTo?: string

}
function ProtectedRoutes({ canActive, redirectTo = '/' }: Props) {

    if (!canActive) {
        return <Navigate to={redirectTo} replace />
    }
    return <Outlet />;
}

export default ProtectedRoutes