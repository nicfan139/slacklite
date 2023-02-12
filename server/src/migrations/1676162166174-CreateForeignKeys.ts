import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableColumn } from 'typeorm';

export class CreateForeignKeys1676162166174 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'channel_members_user',
				columns: [
					{
						name: 'channelId',
						type: 'uuid',
						isPrimary: true,
					},
					{
						name: 'userId',
						type: 'uuid',
						isPrimary: true,
					}
				]
			})
		);

		await queryRunner.createForeignKey(
			'channel_members_user',
			new TableForeignKey({
				columnNames: ['channelId'],
				referencedTableName: 'channel',
				referencedColumnNames: ['id'],
			})
		);

		await queryRunner.createForeignKey(
			'channel_members_user',
			new TableForeignKey({
				columnNames: ['userId'],
				referencedTableName: 'user',
				referencedColumnNames: ['id']
			})
		);

		await queryRunner.addColumns('message', [
			new TableColumn({
				name: 'channelId',
				type: 'uuid',
			}),
			new TableColumn({
				name: 'fromId',
				type: 'uuid',
			}),
		]);

		await queryRunner.createForeignKey(
			'message',
			new TableForeignKey({
				columnNames: ['channelId'],
				referencedTableName: 'channel',
				referencedColumnNames: ['id']
			})
		);

		await queryRunner.createForeignKey(
			'message',
			new TableForeignKey({
				columnNames: ['fromId'],
				referencedTableName: 'user',
				referencedColumnNames: ['id']
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable('channel_members_user');
	}
}
