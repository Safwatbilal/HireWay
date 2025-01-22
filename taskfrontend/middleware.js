import { NextResponse } from 'next/server';

export async function middleware(request) {
    const name = request.cookies.get('name');
    const url = request.nextUrl.clone();
    console.log(url.pathname)
    if (name === undefined) {
        if (url.pathname === '/add-job' || url.pathname === '/Myjob') {
            return NextResponse.redirect(new URL('/login/user', request.url));
        }
    }
    else if (name.value === 'user') {
        if (url.pathname === '/add-job' || url.pathname === '/Myjob' || url.pathname === '/login/user' || url.pathname === '/signup/user' || url.pathname === '/login/company' || url.pathname === '/signup/company') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    else if (name.value === 'company') {
        if (url.pathname === '/alljob' || url.pathname === '/login/user' || url.pathname === '/signup/user' || url.pathname === '/login/company' || url.pathname === '/signup/company') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/add-job', '/Myjob', '/alljob', '/login/user', '/login/company', '/signup/user', '/signup/company'],
};
