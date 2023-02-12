import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
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

	@ManyToMany(() => User, (user) => user.channels)
	@JoinTable()
	members!: User[];

	@OneToMany(() => Message, (message) => message.channel)
	messages!: Message[];
}
