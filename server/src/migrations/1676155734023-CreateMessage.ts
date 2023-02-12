import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMessage1676155734023 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.createTable(
			new Table({
				name: 'message',
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
						name: 'text',
						type: 'text',
						isNullable: false
					},
					{
						name: 'createdAt',
						type: 'timestamptz',
						isNullable: false
					},
					{
						name: 'updatedAt',
						type: 'timestamptz',
						isNullable: false
					}
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable('message');
	}
}
