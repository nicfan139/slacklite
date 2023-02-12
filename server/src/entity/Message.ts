import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne
} from 'typeorm';
import { Channel } from './Channel';
import { User } from './User';

@Entity()
export class Message {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	text!: string;

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

	@ManyToOne(() => Channel, (channel) => channel.messages)
	channel!: Channel;

	@ManyToOne(() => User, (user) => user.messages)
	from!: User;
}
