import { Role } from "./role";

export class User {
 id: number;
 name: string;
 email: string;
 phone: string;
 username: string;
 jwtToken?: string;
 role: Role;
}