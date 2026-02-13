import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAuthContext} from "@/contexts/AuthContext.js";
import Loading from "@/components/feedback/Loading.js";
import {
    PUBLIC_ROUTES,
    ROUTES
} from "@/constants/PathRoutes.js";


export default function ProtectedRoute({children}) {
    const {isAuthenticated, hasRoutePermission, loading} = useAuthContext();
    const location = useLocation();

    if (loading) {
        return (
            <Loading minHeight={'100vh'}/>
        );
    }

    //VERIFICA SE ESTA AUTENTICADO E SE NÃO É UMA ROTA PUBLICA
    if (!isAuthenticated() && !Object.values(PUBLIC_ROUTES).includes(location.pathname)) {

        return <Navigate to={ROUTES.LOGIN}/>;
    }
    // if (!hasRoutePermission(location.pathname)) {
    //     message.warning('Você não tem permissão para acessar esta página');
    //     return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace/>;
    // }
    return children;
}