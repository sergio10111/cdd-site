export interface NavLink {
    name: string;
    path: string;
    icon?: string;
    index?: number;
    navLinks?: NavLink[];
}

// export nav links
export const navLinks:NavLink[] = [
    {
        name: 'Home',
        path: '/',
        icon: 'home',
        index: 0
    },
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'dashboard',
        index: 1,
        navLinks: [
            {
                name: 'Profile',
                path: '/profile',
                icon: 'profile',
                index: 1
            },
        ]
    },
    {
        name: 'Login',
        path: '/login',
        icon: 'login',
        index: 2
    },
    {
        name: 'Register',
        path: '/register',
        icon: 'register',
        index: 3
    },
    {
        name: 'Admin',
        path: '/admin',
        icon: 'admin',
        index: 4,
        navLinks: [
            {
                name: 'Users',
                path: '/users',
                icon: 'users',
                index: 0
            },
            {
                name: 'Roles',
                path: '/roles',
                icon: 'roles',
                index: 1
            },
            {
                name: 'Inspections',
                path: '/inspections',
                icon: 'inspections',
                index: 2,
                navLinks: [
                    {
                        name: 'Inspection',
                        path: '/inspection',
                        icon: 'inspection',
                    }
                ]
            },
            {
                name: 'Profile',
                path: '/profile',
                icon: 'profile',
                index: 3
            }
        ]
    },
    {
        name: 'About',
        path: '/about',
        icon: 'about',
        index: 5
    },
    {
        name: 'Services',
        path: '/services',
        icon: 'services',
        index: 6
    },
    {
        name: 'Contact',
        path: '/contact',
        icon: 'contact',
        index: 7
    }
    
]

// unauthorized nav paths using regex
export const unauthorizedNavPaths = [
    /^\/login/,
    /^\/register/,
    /^\/about/,
    /^\/services/,
    /^\/contact/,
    /^\/$/
]

// authorized nav paths using regex
export const authorizedNavPaths = [
    /^\/dashboard/,
    /^\/admin/,
    /^\/profile/,
    /^\/inspections/,
    /^\/settings/,
    /^\/inspection/,
    /^\/$/,
    /^\/about/,
    /^\/services/,
    /^\/contact/,
]

// check if url is in unauthorized nav paths
export const isUnauthorizedNavPath = (url:string):boolean => {
    let isUnauthorized = false
    if (unauthorizedNavPaths.some(path => path.test(url))) {
        isUnauthorized = true
    } else {
        isUnauthorized = false
    }

    console.log(`is ${url} unauthorized`, isUnauthorized)

    return isUnauthorized
}

// check if url is in authorized nav paths
export const isAuthorizedNavPath = (url:string):boolean => {
    let isAuthorized = false
    if (authorizedNavPaths.some(path => path.test(url))) {
        isAuthorized = true
    } else {
        isAuthorized = false
    }

    console.log(`is ${url} authorized`, isAuthorized)

    return isAuthorized
}

// export unauthorized nav links
// export const unauthorizedNavLinks:NavLink[] = 