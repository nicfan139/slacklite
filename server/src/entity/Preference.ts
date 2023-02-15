import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	JoinColumn
} from 'typeorm';
import { User } from './User';

@Entity()
export class Preference {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({
		type: 'text',
		default: 'red'
	})
	colorScheme!: string;

	@Column({
		type: 'bool',
		default: false
	})
	darkModeEnabled!: boolean;

	@Column({
		type: 'text',
		default: 'fullName'
	})
	chatNameDisplay!: string;

	@CreateDateColumn({
		type: 'timestamptz',
		default: () => 'now()'
	})
	createdAt!: Date;

	@UpdateDateColumn({
		type: 'timestamptz',
		default: () => 'now()'
	})
	updatedAt!: Date;

	@OneToOne(() => User, (user) => user.preferences)
	@JoinColumn()
	user!: User;
}
