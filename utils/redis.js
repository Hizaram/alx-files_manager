import redis from 'redis';
import { promisify } from 'util';


/**
 * RedisClient - Class for performing operations with Redis service
 */
class RedisClient {
	constructor() {
		this.client = redis.createClient();
		this.getAsync = promisify(this.client.get).bind(this.client);

		this.client.on('error', (error) => {
			console.log(`Redis client not connected to the server: ${error.message}`);
		});
	}

	/**
	 * isAlive - checks to see if Redis client is connected
	 * return: {boolean} true if succesfully, otherwise false
	 */
	isAlive() {
		return this.client.connected;
	}

	/**
	 * get - Async function to get the value of the key stored in Redis
	 * @key {string}: key to search for in redis
	 * return: {string} value of the key
	 */
	async get(key) {
		const value = await this.getAsync(key);
		return value;
	}

	/**
	 * set - creates a new key in redis
	 * @key: {string} key to be set
	 * @value: {string} value of the key to be set
	 * duration: {number} expiration time of the key
	 */
	async set(key, value, duration) {
		this.client.setex(key, duration, value);
	}

	/**
	 * del - deletes a key and its value stored in redis
	 * @key: {string} key to be deleted
	 */
	async del(key) {
		this.client.del(key);
	}
}

const redisClient = new RedisClient();

export default redisClient;
