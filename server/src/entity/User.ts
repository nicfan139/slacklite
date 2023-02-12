import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany } from 'typeorm';
import { Channel } from './Channel';
import { Message } from './Message';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	firstName!: string;

	@Column()
	lastName!: string;

	@Column()
	email!: string;

	@Column()
	password!: string;

	@Column()
	isAdmin!: boolean;

	@CreateDateColumn({
		type: 'timestamptz',
		default: () => 'now()'
	})
	createdAt!: Date;

	@UpdateDateColumn({
		type: 'timestamptz',
		default: () => 'now()',
	})
	updatedAt!: Date;

	@ManyToMany(() => Channel, (channel) => channel.members)
	channels!: Channel[];

	@OneToMany(() => Message, (message) => message.from)
	messages!: Message[];
}
