import * as UserServices from '../../user/UserServices'

export const getUserFull = async ({ email }) => {
    const users = await UserServices.getUsers()
    const user = users.find(user => user.email === email)
    return {
        username: user.username,
        photo: user.photo
    }
}