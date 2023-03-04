import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddVerifiedToUser1677884679733 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumns('user', [
			new TableColumn({
				name: 'verified',
				type: 'boolean',
				isNullable: false,
				default: false
			}),
			new TableColumn({
				name: 'verifyToken',
				type: 'text',
				isNullable: true
			})
		]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumns('user', ['verified', 'verifyToken']);
	}
}
