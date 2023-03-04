import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	OneToMany,
	OneToOne
} from 'typeorm';
import { Channel } from './Channel';
import { Message } from './Message';
import { Preference } from './Preference';

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

	@Column()
	verified!: boolean;

	@Column()
	verifyToken!: string;

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

	@ManyToMany(() => Channel, (channel) => channel.members)
	channels!: Channel[];

	@OneToMany(() => Channel, (channel) => channel.owner)
	channelsOwned!: Channel[];

	@OneToMany(() => Message, (message) => message.from)
	messages!: Message[];

	@OneToOne(() => Preference, (preference) => preference.user)
	preferences!: Preference;
}
