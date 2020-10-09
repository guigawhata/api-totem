import { MigrationInterface, QueryRunner } from 'typeorm';

export default class APIMigration1602248386712 implements MigrationInterface {
  name = 'APIMigration1602248386712';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying DEFAULT null, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "carts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "finished_at" TIMESTAMP, "cancelled_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "client_id" uuid, CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "original_name" character varying NOT NULL, "new_name" character varying NOT NULL, "url" character varying NOT NULL, "path" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "aroma" character varying NOT NULL, "quantity_ml" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bb8fba1cc1611d5c1b15aaf471f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6ad7b08e6491a02ebc9ed82019d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "quantity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "product_type_id" uuid, "profile_id" uuid, CONSTRAINT "REL_0a37021d055ab21b7ec00d2a4c" UNIQUE ("profile_id"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "totems" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "pin" character varying NOT NULL, "qr_reader_id" character varying NOT NULL, "aroma_dispenser_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_694dd11e9c3a9f9a0c77d402461" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products_images_images" ("productsId" uuid NOT NULL, "imagesId" uuid NOT NULL, CONSTRAINT "PK_6026db3396a9853484699de9365" PRIMARY KEY ("productsId", "imagesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7ee38a4cd167c44d94cb0be917" ON "products_images_images" ("productsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_57fbf176c86e29281369d65f3b" ON "products_images_images" ("imagesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "carts" ADD CONSTRAINT "FK_e123c49ba6e8da0437583052b3d" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_9adb63f24f86528856373f0ab9a" FOREIGN KEY ("product_type_id") REFERENCES "product_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_0a37021d055ab21b7ec00d2a4c3" FOREIGN KEY ("profile_id") REFERENCES "product_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_images_images" ADD CONSTRAINT "FK_7ee38a4cd167c44d94cb0be917a" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_images_images" ADD CONSTRAINT "FK_57fbf176c86e29281369d65f3b2" FOREIGN KEY ("imagesId") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products_images_images" DROP CONSTRAINT "FK_57fbf176c86e29281369d65f3b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_images_images" DROP CONSTRAINT "FK_7ee38a4cd167c44d94cb0be917a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_0a37021d055ab21b7ec00d2a4c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_9adb63f24f86528856373f0ab9a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "carts" DROP CONSTRAINT "FK_e123c49ba6e8da0437583052b3d"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_57fbf176c86e29281369d65f3b"`);
    await queryRunner.query(`DROP INDEX "IDX_7ee38a4cd167c44d94cb0be917"`);
    await queryRunner.query(`DROP TABLE "products_images_images"`);
    await queryRunner.query(`DROP TABLE "totems"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "product_types"`);
    await queryRunner.query(`DROP TABLE "product_profiles"`);
    await queryRunner.query(`DROP TABLE "images"`);
    await queryRunner.query(`DROP TABLE "carts"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
