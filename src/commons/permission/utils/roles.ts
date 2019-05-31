interface IRole {
    id: string,
    name: string,
    description: string,
    resources: { id: string, permissions: string[] }[]
}

interface IRoleMap {
    [role: string]: IRole
}

const roles: IRoleMap = {
    manager: {
        id: 'manager',
        name: 'Manager',
        description: '',
        resources: [
            {
                id: 'order',
                permissions: []
            },
            {
                id: 'product',
                permissions: ['create', 'read', 'update', 'delete']
            },
            {
                id: 'category',
                permissions: ['create', 'read', 'update', 'delete']
            },
            {
                id: 'distributor',
                permissions: ['create', 'read', 'update', 'delete']
            },
            {
                id: 'supply',
                permissions: ['create', 'read', 'update-approval', 'delete']
            },
            {
                id: 'report',
                permissions: ['read']
            },
            {
                id: 'employee',
                permissions: ['create', 'read', 'update', 'delete']
            },
            {
                id: 'workShift',
                permissions: ['create', 'read', 'update', 'delete']
            }
        ]
    },
    cashier: {
        id: 'cashier',
        name: 'Cashier',
        description: '',
        resources: [
            {
                id: 'order',
                permissions: ['read', 'create']
            },
            {
                id: 'supply',
                permissions: ['read', 'update-check']
            }
        ]
    },
    stockClerk: {
        id: 'stockclerk',
        name: 'Stock Clerk',
        description: '',
        resources: [
            {
                id: 'product',
                permissions: ['read', 'update']
            },
            {
                id: 'supply',
                permissions: ['read', 'update-check']
            }
        ]
    }
}

function checkRoleHasPermission(args: { requiredPermission: string, requiredResource: string, role: string }): boolean {
    const { requiredPermission, requiredResource, role } = args;

    // Use "hasOwnProperty" in TypeScript.
    const hasOwnProperty = Object.prototype.hasOwnProperty;

    if (!hasOwnProperty.call(roles, role)) {
        return false;
    }

    const resources = (roles[role] as IRole).resources
    const resource = resources.find(resource => resource.id === requiredResource)
    if (!resource) {
        return false;
    }
    if (resource.permissions.indexOf(requiredPermission) === -1) {
        return false;
    }

    return true;
}

export default checkRoleHasPermission;
