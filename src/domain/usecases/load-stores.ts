import { Store } from '../models'

export interface LoadStores {
  load: () => Promise<LoadStores.Result>
}

export namespace LoadStores {
  export type Result = Store[]
}
