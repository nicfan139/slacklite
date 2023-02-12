import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddChannelOwner1676242053445 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'channel',
			new TableColumn({
				name: 'ownerId',
				type: 'uuid',
				isNullable: true
			})
		);

		await queryRunner.createForeignKey(
			'channel',
			new TableForeignKey({
				columnNames: ['ownerId'],
				referencedTableName: 'user',
				referencedColumnNames: ['id']
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('channel', 'ownerId');
	}
}
