import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreatePreference1676453435667 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'preference',
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
						name: 'colorScheme',
						type: 'text',
						isNullable: false,
						default: "'red'"
					},
					{
						name: 'darkModeEnabled',
						type: 'boolean',
						isNullable: false,
						default: false
					},
					{
						name: 'chatNameDisplay',
						type: 'text',
						isNullable: false,
						default: "'fullName'"
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
					},
					{
						name: 'userId',
						type: 'uuid'
					}
				]
			})
		);

		await queryRunner.createForeignKey(
			'preference',
			new TableForeignKey({
				columnNames: ['userId'],
				referencedTableName: 'user',
				referencedColumnNames: ['id']
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable('preference');
	}
}
