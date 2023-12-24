import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import * as expressGraphQl from 'express-graphql'
import bodyParser from 'body-parser'
import errorHandler from '@libs/errors/error-handler'
import graphQlSchema from '../graphql'
import {connect} from './db'

export const run = () => {
	const app = express()

	app.use(helmet())
	app.use(compression())
	app.use(cors())
	app.use(bodyParser.json())

	app.use(
		'/graphql',
		expressGraphQl.graphqlHTTP({
			schema: graphQlSchema,
			graphiql: true,
			customFormatErrorFn(error) {
				const formattedError = errorHandler(error.originalError!)

				const finalError = formattedError ?? {
					message: error.message,
					locations: error.locations,
					path: error.path,
				}

				return finalError
			},
		}),
	)

	app.listen(3000, async () => {
		console.log('Connecting to DB...')
		await connect()
		console.log('Server running on port 3000')
	})
}
