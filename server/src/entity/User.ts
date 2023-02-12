import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
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

	@Column({
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP'
	})
	createdAt!: Date;

	@Column({
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP'
	})
	updatedAt!: Date;

	@ManyToMany(() => Channel, (channel) => channel.members)
	channels!: Channel[];

	@OneToMany(() => Message, (message) => message.from)
	messages!: Message[];
}
