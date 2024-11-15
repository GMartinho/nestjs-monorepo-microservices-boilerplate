import { UserAccountEntity } from "./entity/user-account.entity";
import { UserProviderEntity } from "./entity/user-provider.entity";
import { UserSettingEntity } from "./entity/user-setting.entity";

export const USER_PROVIDER_OPTIONS = {
    GOOGLE: 'GOOGLE',
    FACEBOOK: 'FACEBOOK',
    APPLE: 'APPLE',
    X: 'X',
} as const;

export type UserProviderOptions = typeof USER_PROVIDER_OPTIONS[keyof typeof USER_PROVIDER_OPTIONS];

export const USER_ACCOUNT_ROLE = {
    STANDARD: 'STANDARD',
    PREMIUM: 'PREMIUM',
    ADMIN: 'ADMIN'
} as const;

export type UserAccountRole = typeof USER_ACCOUNT_ROLE[keyof typeof USER_ACCOUNT_ROLE];

export const USER_ACCOUNT_STATUS = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    SUSPENDED: 'SUSPENDED',
    ARCHIVED: 'ARCHIVED'
} as const;

export type UserAccountStatus = typeof USER_ACCOUNT_STATUS[keyof typeof USER_ACCOUNT_STATUS];

export type User = {
    account: Partial<UserAccountEntity>,
    provider?: Partial<UserProviderEntity>,
    setting?: Partial<UserSettingEntity>
}