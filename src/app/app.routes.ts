import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { CreateProducts } from './Pages/create-products/create-products';
import { Login } from './Pages/login/login';
import { Register } from './Pages/register/register';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'create-products',
        component: CreateProducts
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    }
];