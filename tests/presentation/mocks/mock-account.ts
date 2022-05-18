import { AddAccount } from '@/domain/add-account'

export class AddAccountSpy implements AddAccount {
  result = true
  addAccountParams: AddAccount.Params

  async add (account: AddAccount.Params): Promise<boolean> {
    this.addAccountParams = account
    return this.result
  }
}
