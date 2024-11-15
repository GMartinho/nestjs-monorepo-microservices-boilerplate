import { UserAccountEntity } from "../../../../src/modules/user/entity/user-account.entity";
import { USER_ACCOUNT_ROLE, USER_ACCOUNT_STATUS } from "../../../../src/modules/user/user.types";
import { UUID } from "crypto";
import { mock } from "jest-mock-extended";
import { v4 as uuidv4 } from 'uuid';


export const mockUserAccount = (options?: Partial<UserAccountEntity>) => mock<UserAccountEntity>({
    id: uuidv4() as UUID,
    createdAt: new Date(),
    updatedAt: new Date(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    role: USER_ACCOUNT_ROLE.STANDARD,
    status: USER_ACCOUNT_STATUS.INACTIVE,
    phone: '13230024922',
    avatarPath: '/avatar-path',
    ...options
} as UserAccountEntity);