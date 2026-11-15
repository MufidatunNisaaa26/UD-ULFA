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
  {
    username: 'kasir_siti',
    password: 'kasir123',
    displayName: 'Siti Rohimah',
    role: 'Kasir',
  },
]

