import {type Producer} from '@core/producer/types'

export interface Product {
	_id: string
	vintage: string
	name: string
	producerId: string
	producer?: Producer
}
