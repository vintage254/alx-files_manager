import { createClient }  from 'redis';
import { promisify } from 'util';

class RedisClient {
	constructor(){
		this.client = createClient();
		this.client.on('error', (error) => {
			console.error(`Redis client error: ${error}`);
		});
		
		this.getAsync = promisify(this.client.get).bind(this.client);
		this.setexAsync = promisify(this.client.set).bind(this.client);
		this.delAsync = promisify(this.client.del).bind(this.client);
		this.expireAsync = promisify(this.client.expire).bind(this.client);
	}

	isAlive() {
		if (this.client.connected) {
			return true;
		}
		return false;
	}

	async get(key) {
		return await this.getAsync(key);
	}

	async set(key, value, duration) {
		await this.setAsync(key, value);
		await this.expireAsync(key, duration);
	}

	async del(key) {
		await this.delAsync(key);
	}
}

const redisClient = new RedisClient();
export default redisClient;

