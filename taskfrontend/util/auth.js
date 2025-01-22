import { redirect } from 'next/navigation';
export function login(type, name) {
    localStorage.setItem(type, name)
    redirect('/')
}
export function companyId() {
    const companyId = localStorage.getItem('companyId');
    return companyId
}
export function user() {
    const user = localStorage.getItem('user');
    return user
}
export function company() {
    const company = localStorage.getItem('company');
    return company
}
