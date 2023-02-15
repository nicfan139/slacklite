import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserRepository } from '../resolvers/helpers';

const router = Router();
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

router.post('/login', async (req: Request, res: Response) => {
	const user = await UserRepository.findOne({
		where: { email: req.body.email },
		relations: {
			channels: true,
			channelsOwned: true
		},
		order: {
			channels: {
				createdAt: 'DESC'
			},
			channelsOwned: {
				createdAt: 'DESC'
			}
		}
	});

	if (user) {
		const passwordMatch = await bcrypt.compare(req.body.password, user.password);

		if (passwordMatch) {
			const token = jwt.sign(
				{
					id: user.id
				},
				JWT_SECRET_KEY,
				{
					expiresIn: '24h'
				}
			);

			res.status(200).json({
				accessToken: token,
				user: {
					id: user.id
				}
			});
		} else {
			res.status(400).json({
				errorMessage: 'Invalid email/password combination'
			});
		}
	} else {
		res.status(400).json({
			errorMessage: 'Invalid email/password combination'
		});
	}
});

router.post('/validate_token', async (req: Request, res: Response) => {
	const token = req.body.token;
	let jwtPayload;
	try {
		jwtPayload = jwt.verify(token, JWT_SECRET_KEY);
	} catch (error) {
		console.log(error);
	}

	if (jwtPayload) {
		const user = await UserRepository.findOne({
			where: { id: (jwtPayload as JwtPayload).id },
			relations: {
				channels: true,
				channelsOwned: true
			},
			order: {
				channels: {
					createdAt: 'DESC'
				},
				channelsOwned: {
					createdAt: 'DESC'
				}
			}
		});

		if (user) {
			res.status(200).json({
				isTokenValid: true,
				user: {
					id: user.id
				}
			});
		} else {
			res.status(500).json({
				isTokenValid: false,
				errorMessage: 'Unable to extract user details with the provided access token'
			});
		}
	} else {
		res.status(400).json({
			isTokenValid: false,
			errorMessage: 'Invalid or expired access token'
		});
	}
});

export default router;