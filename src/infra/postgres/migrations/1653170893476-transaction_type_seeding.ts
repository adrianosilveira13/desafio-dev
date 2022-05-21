import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'
import { PgTransactionType } from '../entities'

export class transactionTypeSeeding1653170893476 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const transactionRepo = getRepository(PgTransactionType)
    await transactionRepo.save([
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
