import { MigrationInterface, QueryRunner } from 'typeorm'

export class defaultTables1653170444902 implements MigrationInterface {
  name = 'defaultTables1653170444902'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transaction" DROP CONSTRAINT "FK_70ba1b413fbea6458c05d8895ea"')
    await queryRunner.query('ALTER TABLE "transaction" DROP CONSTRAINT "FK_98271e4a83052aeca9aa11fd3ca"')
    await queryRunner.query('CREATE TABLE "transactionType" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "type" character varying NOT NULL, "signal" character(1) NOT NULL, CONSTRAINT "UQ_0a91b63765242dfb626596a2647" UNIQUE ("description"), CONSTRAINT "PK_3d7af1e1abef6026e9bdbef2c00" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "stores" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "owner" character varying NOT NULL, CONSTRAINT "PK_7aa6e7d71fa7acdd7ca43d7c9cb" PRIMARY KEY ("id"))')
    await queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "store_id"')
    await queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "transaction_type_id"')
    await queryRunner.query('ALTER TABLE "transaction" ADD "storeId" integer')
    await queryRunner.query('ALTER TABLE "transaction" ADD "transactionTypeId" integer')
    await queryRunner.query('ALTER TABLE "transaction" ADD CONSTRAINT "FK_37096c1d619bbd8865042bede28" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "transaction" ADD CONSTRAINT "FK_0e57c323890648df9aa92e57a34" FOREIGN KEY ("transactionTypeId") REFERENCES "transactionType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transaction" DROP CONSTRAINT "FK_0e57c323890648df9aa92e57a34"')
    await queryRunner.query('ALTER TABLE "transaction" DROP CONSTRAINT "FK_37096c1d619bbd8865042bede28"')
    await queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "transactionTypeId"')
    await queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "storeId"')
    await queryRunner.query('ALTER TABLE "transaction" ADD "transaction_type_id" integer')
    await queryRunner.query('ALTER TABLE "transaction" ADD "store_id" integer')
    await queryRunner.query('DROP TABLE "stores"')
    await queryRunner.query('DROP TABLE "transactionType"')
    await queryRunner.query('ALTER TABLE "transaction" ADD CONSTRAINT "FK_98271e4a83052aeca9aa11fd3ca" FOREIGN KEY ("transaction_type_id") REFERENCES "transactiontype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "transaction" ADD CONSTRAINT "FK_70ba1b413fbea6458c05d8895ea" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }
}
