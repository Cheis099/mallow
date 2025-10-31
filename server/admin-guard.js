import { getCurrentUser } from './auth.js';

const user = getCurrentUser();

if (!user || user.role !== 'admin') {
    window.location.replace('unauthorized.html');
}