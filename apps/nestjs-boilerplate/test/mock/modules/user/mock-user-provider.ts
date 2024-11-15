import { UserProviderEntity } from "../../../../src/modules/user/entity/user-provider.entity";
import { USER_PROVIDER_OPTIONS } from "../../../../src/modules/user/user.types";
import { UUID } from "crypto";
import { mock } from "jest-mock-extended";
import { v7 as uuidv7 } from 'uuid';


export const mockUserProvider = (options?: Partial<UserProviderEntity>) => mock<UserProviderEntity>({
    id: uuidv7() as UUID,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: USER_PROVIDER_OPTIONS.GOOGLE,
    key: 'any-key',
    ...options
});