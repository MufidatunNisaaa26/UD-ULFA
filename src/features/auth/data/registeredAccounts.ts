export interface UserAccount {
  username: string
  password: string
  displayName: string
  role: 'Owner' | 'Kasir'
}

export const registeredAccounts: UserAccount[] = [
  {
    username: 'UDULFA',
    password: 'udulfa123',
    displayName: 'UD ULFA',
    role: 'Owner',
  },
]
