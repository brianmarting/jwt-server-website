import { UserDto } from '../dto/user.dto';
import { User } from '../entity/user';

export class UserMapper {

    static toDto(users: User[]): UserDto[] {
        if (!users) {
            return [];
        }

        return users.map(user => ({
            id: user.externalId,
            username: user.username
        }) as UserDto);
    }
}
