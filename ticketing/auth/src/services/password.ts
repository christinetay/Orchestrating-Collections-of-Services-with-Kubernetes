import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { Buffer } from 'buffer';

const scryptAsync = promisify(scrypt);

export class Password {

    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        let buf = (await scryptAsync(password, salt, 4)) as unknown as Buffer;

        return `${buf.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.');
        let buf = (await scryptAsync(suppliedPassword, salt, 4)) as unknown as Buffer;

        return buf.toString('hex') === hashedPassword;
    }
}