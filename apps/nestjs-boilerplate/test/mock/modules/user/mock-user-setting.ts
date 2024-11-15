import { UserSettingEntity } from "../../../../src/modules/user/entity/user-setting.entity";
import { UUID } from "crypto";
import { mock } from "jest-mock-extended";
import { v7 as uuidv7 } from 'uuid';


export const mockUserSetting = (options?: Partial<UserSettingEntity>) => mock<UserSettingEntity>({
    id: uuidv7() as UUID,
    createdAt: new Date(),
    updatedAt: new Date(),
    isEmailVerified: false,
    isPhoneVerified: false,
    ...options
});