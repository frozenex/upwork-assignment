// Original Code
findOneByEmail(email: string): Promise<any> {
    return getRepository(User)
        .createQueryBuilder('user')
        .where(`user.email=${email}`)
        .getOne();
}

// Modified Code
@Injectable()
export class UserService {

    constructor(@InjectRepository(User)
                private readonly userRepository: Repository<User>) {}

    async function findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.createQueryBuilder('u')
            .where('u.email = :email', { email })
            .getOne();
    }
}

// Issues i could think of: 
// 1. Using template literals for adding the user input is a bad practice since it might
//    result in sql injection attacks
// 2. The return type should be User or Partial<User> depending on the query
// 3. Getting the respository using getRepository method is a bad practice its better to inject
//    the repository in the constructor if you are planning to use it in multiple methods.