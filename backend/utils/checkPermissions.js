import { UnauthorizedError } from '../errors/index.js'

// only admin can see profile of other users
const checkPermissions = (requestUser, resourceUserId) => {
    /*console.log(requestUser);
    console.log(resourceUserId);
    console.log(typeof resourceUserId);*/
    if(requestUser.role === 'admin') return 
    if(requestUser.userId === resourceUserId.toString()) return 

    throw new UnauthorizedError('Unauthorized to access this resource')
}

export default checkPermissions