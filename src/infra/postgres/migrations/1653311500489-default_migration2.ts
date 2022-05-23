import { MigrationInterface, QueryRunner } from 'typeorm'

export class defaultMigration21653311500489 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("INSERT INTO \"transactionType\"(description, type, signal)VALUES ('Débito', 'Entrada', '+')")
    await queryRunner.query("INSERT INTO \"transactionType\"(description, type, signal)VALUES ('Boleto', 'Saída', '-')")
    await queryRunner.query("INSERT INTO \"transactionType\"(description, type, signal)VALUES ('Financiamento', 'Saída', '-')")
    await queryRunner.query("INSERT INTO \"transactionType\"(description, type, signal)VALUES ('Crédito', 'Entrada', '+')")
    await queryRunner.query("INSERT INTO \"transactionType\"(description, type, signal)VALUES ('Recebimento Empréstimo', 'Entrada', '+')")
    await queryRunner.query("INSERT INTO \"transactionType\"(description, type, signal)VALUES ('Vendas', 'Entrada', '+')")
    await queryRunner.query("INSERT INTO \"transactionType\"(description, type, signal)VALUES ('Recebimento TED', 'Entrada', '+')")
    await queryRunner.query("INSERT INTO \"transactionType\"(description, type, signal)VALUES ('Recebimento DOC', 'Entrada', '+')")
    await queryRunner.query("INSERT INTO \"transactionType\"(description, type, signal)VALUES ('Aluguel DOC', 'Saída', '-')")
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM "transactionType"')
  }
}
