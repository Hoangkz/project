import { App } from "libs/shared/entities/ms-app/app.entity";
import { User } from "libs/shared/entities/ms-auth/user.entity";
import { Project } from "libs/shared/entities/ms-vc-project/project.entity";
import { Organization } from "src/shared/entities/ms-organization/organization.entity";

declare global {
	namespace Express {
		interface Request {
			user?: User;
			project?: Project,
			authApp?: App;
			organizationId?: string;
			organization?: Organization;
			organizations?: Organization[];
		}
	}
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'dev'|'prod'
			DB_NAME_GPON: string;
			APP_SECRET: string;
			SECRET_KEY: string;
			UPLOAD_FOLDER: string;

			FILE_STORE_DIRECTORY: string;
			DB_HOST: string;
			DB_PORT: string;
			DB_TYPE: string;
			DB_USERNAME: string;
			DB_PASSWORD: string;
			DB_NAME: string;
		}
	}

	namespace socket.io {
		interface Socket {
			user?: User
		}
	}
}
