import { MigrationInterface, QueryRunner } from 'typeorm'

export class configtables1653073676322 implements MigrationInterface {
  name = 'configtables1653073676322'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "transaction_types" ("id" SERIAL NOT NULL, "description" character varying(30) NOT NULL, "type" character varying(20) NOT NULL, "signal" character(1) NOT NULL, CONSTRAINT "UQ_47456d15ba6d2d80fe348f24f54" UNIQUE ("description"), CONSTRAINT "PK_2a49fe7879bf8a02812639cea61" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "date" date NOT NULL, "amount" double precision NOT NULL, "document" character varying(11) NOT NULL, "card" character varying(16) NOT NULL, "storeId" integer, "transactionTypeId" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "stores" ("id" SERIAL NOT NULL, "name" character varying(40) NOT NULL, "owner" character varying(40) NOT NULL, CONSTRAINT "PK_7aa6e7d71fa7acdd7ca43d7c9cb" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(300) NOT NULL, "accesstoken" character varying(400), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))')
    await queryRunner.query('ALTER TABLE "transactions" ADD CONSTRAINT "FK_a7c1442f4ce2c2faf3b00a92f88" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "transactions" ADD CONSTRAINT "FK_13ec2f6f02ddbb52a02ab867156" FOREIGN KEY ("transactionTypeId") REFERENCES "transaction_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transactions" DROP CONSTRAINT "FK_13ec2f6f02ddbb52a02ab867156"')
    await queryRunner.query('ALTER TABLE "transactions" DROP CONSTRAINT "FK_a7c1442f4ce2c2faf3b00a92f88"')
    await queryRunner.query('DROP TABLE "users"')
    await queryRunner.query('DROP TABLE "stores"')
    await queryRunner.query('DROP TABLE "transactions"')
    await queryRunner.query('DROP TABLE "transaction_types"')
  }
}
