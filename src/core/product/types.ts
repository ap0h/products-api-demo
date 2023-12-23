import { Producer } from "@core/producer/types"

export type Product = {
    _id?: string
    vintage: string
    name: string
    producerId?: string
    producer: Producer
}
