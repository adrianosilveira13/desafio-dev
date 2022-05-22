import { Router } from 'express'
import { adaptRoute } from '../adapters'
import { makePersistController } from '../factories/controllers/persist-controller-factory'
import multer from 'multer'
import { auth } from '@/main/middlewares'

const storage = multer.memoryStorage()

const upload = multer({ storage })

export default (router: Router): void => {
  router.post('/persist', upload.single('file'), auth, adaptRoute(makePersistController()))
}
