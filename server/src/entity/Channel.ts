import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Message } from './Message';
import { User } from './User';

@Entity()
export class Channel {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	name!: string;

	@Column({
		type: 'text',
		nullable: true
	})
	description!: string;

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

	@ManyToMany(() => User, (user) => user.channels)
	@JoinTable()
	members!: User[];

	@OneToMany(() => Message, (message) => message.channel)
	messages!: Message[];
}
