import { createClient }  from 'redis';
import { promisify } from 'util';

class RedisClient {
	constructor(){
		this.client = createClient();
		this.client.on('error', (error) => {
			comsole.error(`Redis client error: ${error}`);
		});
		
		this.getAsync = promisify(this.client.get).bind(this.client);
		this.setexAsync = promisify(this.client.setex).bind(this.client);
		this.delAsync = promisify(this.client.del).bind(this.client);
	}

	isAlive() {
		return this.client.connected;
	}

	async get(key) {
		return this.getAsync(key);
	}

	async set(key, duration, value) {
		return this.setexAsync(key, duration, value);
	}

	async del(key) {
		return this.delAsync(key);
	}
}

const redisClient = new RedisClient();
export default redisClient;
