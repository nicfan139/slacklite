import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateChannel1676149396417 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'channel',
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
						name: 'name',
						type: 'text',
						isNullable: false
					},
					{
						name: 'description',
						type: 'text',
						isNullable: true
					},
					{
						name: 'createdAt',
						type: 'timestamptz',
						isNullable: false,
						default: "now()"
					},
					{
						name: 'updatedAt',
						type: 'timestamptz',
						isNullable: false,
						default: "now()",
						onUpdate: "now()"
					}
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('channel');
	}
}
