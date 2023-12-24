import process from 'node:process'
import '@libs/models' // eslint-disable-line import/no-unassigned-import
import mongoose from 'mongoose'
import env from '@config/environment'

export const connect = async () =>
	new Promise((resolve) => {
		mongoose
			.connect(env.mongoUrl, {connectTimeoutMS: 10_000})
			.then(() => {
				console.log('Connected to MongoDB')
				resolve(true)
			})
			.catch((error) => {
				console.error('Failed to connect to MongoDB:', error)
				process.exit(1) // eslint-disable-line unicorn/no-process-exit
			})

		process.once('exit', async () => {
			console.log('Closing MongoDB connection')
			await mongoose.disconnect()
		})
	})
