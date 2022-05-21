import { MigrationInterface, QueryRunner } from 'typeorm'

export class generateDefaultTables21653172356758 implements MigrationInterface {
  name = 'generateDefaultTables21653172356758'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "transactionType" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "type" character varying NOT NULL, "signal" character(1) NOT NULL, CONSTRAINT "UQ_0a91b63765242dfb626596a2647" UNIQUE ("description"), CONSTRAINT "PK_3d7af1e1abef6026e9bdbef2c00" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "date" date NOT NULL, "amount" double precision NOT NULL, "document" character varying NOT NULL, "card" character varying NOT NULL, "store_id" integer NOT NULL, "transaction_type_id" integer NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "stores" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "owner" character varying NOT NULL, CONSTRAINT "PK_7aa6e7d71fa7acdd7ca43d7c9cb" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(300) NOT NULL, "accesstoken" character varying(400), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))')
    await queryRunner.query('ALTER TABLE "transaction" ADD CONSTRAINT "FK_70ba1b413fbea6458c05d8895ea" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "transaction" ADD CONSTRAINT "FK_98271e4a83052aeca9aa11fd3ca" FOREIGN KEY ("transaction_type_id") REFERENCES "transactionType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transaction" DROP CONSTRAINT "FK_98271e4a83052aeca9aa11fd3ca"')
    await queryRunner.query('ALTER TABLE "transaction" DROP CONSTRAINT "FK_70ba1b413fbea6458c05d8895ea"')
    await queryRunner.query('DROP TABLE "users"')
    await queryRunner.query('DROP TABLE "stores"')
    await queryRunner.query('DROP TABLE "transaction"')
    await queryRunner.query('DROP TABLE "transactionType"')
  }
}
