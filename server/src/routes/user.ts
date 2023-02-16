import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { UserRepository, PreferenceRepository } from '../resolvers/helpers';

const router = Router();
dotenv.config();

router.post('/register', async (req: Request, res: Response) => {
	const existingUser = await UserRepository.findOneBy({ email: req.body.email });

	if (!existingUser) {
		const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS;
		const hashedPassword = await bcrypt.hash(req.body.password, Number(BCRYPT_SALT_ROUNDS));
		if (hashedPassword) {
			const payload = {
				...req.body,
				password: hashedPassword
			};
			const user = await UserRepository.create(payload);
			const savedUser = await UserRepository.save(user);

			/**
			 * Type error thrown here when it shouldn't be, as this line of code used in src/resolvers/user.ts passed the TS compiler without issue
			 */
			// @ts-ignore
			const preferences = await PreferenceRepository.create({
				colorScheme: 'red',
				darkModeEnabled: false,
				chatNameDisplay: 'fullName',
				user: savedUser
			});
			await PreferenceRepository.save(preferences);

			res.status(201).json({
				message: 'Successfully created new user'
			});
		} else {
			res.status(500).json({
				errorMessage: 'Unable to encrypt password'
			});
		}
	} else {
		res.status(500).json({
			errorMessage: `User with email "${req.body.email} already exists"`
		});
	}
});

export default router;
