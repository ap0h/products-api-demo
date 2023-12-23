
const envs = {
    mongoUrl: process.env.MONGO_URL,
    port: process.env.PORT
}

export default envs as {[P in keyof typeof envs]: string}
