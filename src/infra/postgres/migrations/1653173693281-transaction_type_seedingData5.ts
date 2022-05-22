import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'
import { PgTransactionType } from '../entities'

export class transactionTypeSeedingData51653173693281 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const typeRepo = getRepository(PgTransactionType)
    await typeRepo.save([
      { description: 'Débito', type: 'Entrada', signal: '+' },
      { description: 'Boleto', type: 'Saída', signal: '-' },
      { description: 'Financiamento', type: 'Saída', signal: '-' },
      { description: 'Crédito', type: 'Entrada', signal: '+' },
      { description: 'Recebimento Empréstimo', type: 'Entrada', signal: '+' },
      { description: 'Vendas', type: 'Entrada', signal: '+' },
      { description: 'Recebimento TED', type: 'Entrada', signal: '+' },
      { description: 'Recebimento DOC', type: 'Entrada', signal: '+' },
      { description: 'Aluguel DOC', type: 'Entrada', signal: '-' }
    ])
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
  }
}
