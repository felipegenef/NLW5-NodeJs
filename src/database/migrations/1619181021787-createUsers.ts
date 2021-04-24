import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1619181021787 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name:'id',
                        type:'uuid',
                        isPrimary:true
                    },
                    {
                        name:'email',
                        type:'varchar',
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('users')
    }

}
