import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1676071076253 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'user',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'uuid',
						isNullable: false
					},
					{
						name: 'firstName',
						type: 'text',
						isNullable: false
					},
					{
						name: 'lastName',
						type: 'text',
						isNullable: false
					},
					{
						name: 'email',
						type: 'text',
						isNullable: false
					},
					{
						name: 'password',
						type: 'text',
						isNullable: false
					},
					{
						name: 'isAdmin',
						type: 'boolean',
						isNullable: false,
						default: false
					},
					{
						name: 'createdAt',
						type: 'timestamptz',
						isNullable: false,
						default: 'now()'
					},
					{
						name: 'updatedAt',
						type: 'timestamptz',
						isNullable: false,
						default: 'now()',
						onUpdate: 'now()'
					}
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('user');
	}
}
