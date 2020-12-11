
type Permission = string;
/**
 * singleton class user permissions
 */
class UserPermissions {

    private static instance: UserPermissions

    private static permissions: Permission[] = []

    public static getInstance(
        permissions: Permission[],
    ) {
        if (!UserPermissions.instance) {
            UserPermissions.instance = new UserPermissions()
            if (permissions instanceof Array) {
                UserPermissions.permissions = permissions
                Object.freeze(UserPermissions.instance)
            }
        }
        return UserPermissions.instance
    }

    public static hasPrivilege(permission: Permission): boolean {
       return this.permissions.includes(permission)
    }

    public static hasAnyPrivileges(queryPermitions: Permission[]): boolean {

        const permition = queryPermitions.find((queryPermition: Permission) => {
            return this.permissions.includes(queryPermition)
        })

        return !!permition
    }

    public static hasAllPrivileges(queryPermitions: Permission[]): boolean {

        const permitions = queryPermitions.filter((queryPermition: Permission) => {
            return this.permissions.includes(queryPermition)
        })

        return permitions.length === queryPermitions.length
    }
}


export default UserPermissions
export {
    Permission
}
