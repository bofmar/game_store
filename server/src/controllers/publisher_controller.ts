import express from 'express';
import Publisher from '../models/publisher.js';

// Get all publishers
export const publisher_get_all = async (_req: express.Request, res: express.Response): Promise<void> => {
	const allPublishers = await Publisher.find({}).exec();
	res.json(allPublishers);
}
