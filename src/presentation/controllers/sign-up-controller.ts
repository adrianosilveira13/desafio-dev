import { Validation } from '@/tests/presentation/controllers/sigup-controller.spec'

export class SignUpController {
  constructor (private readonly validation: Validation) {}

  async handle (request: any): Promise<any> {
    this.validation.validate(request)
  }
}
