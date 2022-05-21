import { MigrationInterface, QueryRunner } from 'typeorm'

export class defaultTables1653169910559 implements MigrationInterface {
  name = 'defaultTables1653169910559'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "transactiontype" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "type" character varying NOT NULL, "signal" character(1) NOT NULL, CONSTRAINT "UQ_1fcacc0aefd87e72af2c87e9261" UNIQUE ("description"), CONSTRAINT "PK_98f12fda3145331aefabfb5a70c" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "date" date NOT NULL, "amount" double precision NOT NULL, "document" character varying NOT NULL, "card" character varying NOT NULL, "store_id" integer, "transaction_type_id" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "store" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "owner" character varying NOT NULL, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(300) NOT NULL, "accesstoken" character varying(400), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))')
    await queryRunner.query('ALTER TABLE "transaction" ADD CONSTRAINT "FK_70ba1b413fbea6458c05d8895ea" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "transaction" ADD CONSTRAINT "FK_98271e4a83052aeca9aa11fd3ca" FOREIGN KEY ("transaction_type_id") REFERENCES "transactiontype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transaction" DROP CONSTRAINT "FK_98271e4a83052aeca9aa11fd3ca"')
    await queryRunner.query('ALTER TABLE "transaction" DROP CONSTRAINT "FK_70ba1b413fbea6458c05d8895ea"')
    await queryRunner.query('DROP TABLE "users"')
    await queryRunner.query('DROP TABLE "store"')
    await queryRunner.query('DROP TABLE "transaction"')
    await queryRunner.query('DROP TABLE "transactiontype"')
  }
}
