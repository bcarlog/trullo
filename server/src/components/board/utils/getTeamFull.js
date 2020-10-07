import * as UserServices from '../../user/UserServices'

const getTeamFull = async (team) => {
    const users = await UserServices.getUsers()
    return team.map(userId => {
        const user = users.find(user => user.id === userId)
        return {
            username: user.username,
            photo: user.photo
        }
    })
}

export default getTeamFull