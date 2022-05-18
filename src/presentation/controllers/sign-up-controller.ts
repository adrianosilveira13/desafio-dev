import { Validation } from '@/presentation/protocols'

export class SignUpController {
  constructor (private readonly validation: Validation) {}

  async handle (request: any): Promise<any> {
    this.validation.validate(request)
  }
}
