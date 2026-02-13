import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect
} from 'react';
import axios from '../services/api';
import ENDPOINTS from '../constants/endpoints';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {ROUTES} from "../constants/PathRoutes";
import ProtectedRoute from "@/components/layout/ProtectedRoute.js";
import DevTools from "@/components/other/DevTools.js";

const AuthContext = createContext(null);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext deve ser usado dentro de AuthProvider');
    }
    return context;
};

export const AuthProvider = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation()

    const fetchMe = useCallback(async (thorwError = false) => {
        try {
            const response = await axios.get(ENDPOINTS.AUTH_ME);

            const userData = response.data;

            if (userData.type === 'Staff') {
                setUser(userData);
            }
        } catch (error) {
            setUser(null);
            if (thorwError) {
                throw Error('')
            }
        }
    }, []);

    useEffect(() => {
        //verifica se existe usuario logado
        const checkAuth = async () => {
            try {
                await fetchMe(true);
                if (location.pathname === ROUTES.LOGIN) {

                    navigate(ROUTES.HOME)
                }

            } catch (error) {

                navigate(ROUTES.LOGIN, {replace: true})
            } finally {
                setLoading(false);
            }

        };
        checkAuth();
    }, [fetchMe]);

    const login = async (username, password) => {
        setLoading(true);
        try {
            await axios.post(ENDPOINTS.AUTH_LOGIN_STAFF, {username, password});
            await fetchMe();
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        axios.post(ENDPOINTS.AUTH_LOGOUT).catch(() => {
        });
        setUser(null);
    };

    const isAuthenticated = () => {
        return !!user && user.type === 'Staff';
    };

    // Verifica se o usuário tem uma permissão específica
    const hasPermission = useCallback((permission) => {
        if (!user?.permissions) return false;
        return user.permissions.includes(permission);
    }, [user]);

    // Verifica se o usuário tem acesso a uma rota
    const hasRoutePermission = useCallback((pathname) => {
        return true
        // const requiredPermission = getRoutePermission(pathname);
        // if (!requiredPermission) return true; // Rota não requer permissão
        // return hasPermission(requiredPermission);
    }, [hasPermission]);

    const value = {
        user,
        login,
        logout,
        isAuthenticated,
        hasPermission,
        hasRoutePermission,
        loading,
        fetchMe,
    };
    return (
        <AuthContext.Provider value={value}>
            <ProtectedRoute>
                <DevTools/>
                <Outlet/>
            </ProtectedRoute>
        </AuthContext.Provider>
    );
};