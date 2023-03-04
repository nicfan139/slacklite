import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createTransport, TransportOptions } from 'nodemailer';
import { UserRepository } from '../resolvers/helpers';
import { getEmailHTML } from '../utils';

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
		jwtPayload = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
	} catch (error) {
		console.log(error);
	}

	if (jwtPayload) {
		const user = await UserRepository.findOne({
			where: { id: jwtPayload.id },
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

router.post('/send_verification_email', async (req: Request, res: Response) => {
	const { accessToken } = req.body;

	let jwtPayload;
	try {
		jwtPayload = jwt.verify(accessToken as string, JWT_SECRET_KEY) as JwtPayload;
	} catch (error) {
		console.log(error);
	}

	if (jwtPayload) {
		const user = await UserRepository.findOneBy({ id: jwtPayload.id });
		if (user) {
			const hashedVerifyEmailToken = await bcrypt.hash(
				user.email,
				Number(process.env.BCRYPT_SALT_ROUNDS)
			);
			if (hashedVerifyEmailToken) {
				UserRepository.merge(user, { verifyToken: hashedVerifyEmailToken });
				await UserRepository.save(user);

				const transport = createTransport({
					host: process.env.SMTP_HOST,
					port: process.env.SMTP_PORT,
					auth: {
						user: process.env.SMTP_USERNAME,
						pass: process.env.SMTP_PASSWORD
					}
				} as TransportOptions);

				await transport.sendMail({
					from: 'admin@slacklite.com',
					to: user.email,
					subject: 'Verify your email with Slacklite',
					html: getEmailHTML(hashedVerifyEmailToken)
				});

				res.status(201).json({
					message: 'Verification email sent!'
				});
			} else {
				res.status(400).json({
					errorMessage: 'Unable to verify email'
				});
			}
		} else {
			res.status(500).json({
				errorMessage: 'Unable to extract user details with the provided access token'
			});
		}
	} else {
		res.status(400).json({
			errorMessage: 'Invalid or expired access token'
		});
	}
});

router.post('/verify_email', async (req: Request, res: Response) => {
	const { accessToken, verifyToken } = req.body;

	let jwtPayload;
	try {
		jwtPayload = jwt.verify(accessToken as string, JWT_SECRET_KEY) as JwtPayload;
	} catch (error) {
		console.log(error);
	}

	if (jwtPayload) {
		const user = await UserRepository.findOneBy({ id: jwtPayload.id });

		if (user) {
			if (user.verified) {
				res.status(400).json({
					isTokenValid: true,
					errorMessage: 'User has already been verified'
				});
			} else if (verifyToken === user.verifyToken) {
				UserRepository.merge(user, { verified: true, verifyToken: '' });
				const updatedUser = await UserRepository.save(user);

				res.status(201).json({
					isTokenValid: true,
					user: updatedUser
				});
			} else {
				res.status(400).json({
					isTokenValid: false,
					errorMessage: 'Unable to verify email'
				});
			}
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
