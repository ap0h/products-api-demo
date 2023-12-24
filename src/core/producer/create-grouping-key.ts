interface CreateGroupingKeyInput {
	vintage: string
	name: string
	producer: {
		name: string
	}
}
export const createGroupingKey = (input: CreateGroupingKeyInput) => {
	return `${input.vintage}-${input.name}-${input.producer.name}`
}
