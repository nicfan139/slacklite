import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Channel } from './Channel';
import { User } from './User';

@Entity()
export class Message {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	text!: string;

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

	@ManyToOne(() => Channel, (channel) => channel.messages)
	channel!: Channel;

	@ManyToOne(() => User, (user) => user.messages)
	from!: User;
}
