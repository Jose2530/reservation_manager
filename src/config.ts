const VERSIONS = {
	V1: '/V1',
};
const URI_DEFAULT = 'http://localhost:9001';
export default {
	PORT: process.env.APPLICATION_PORT ?? '8001',
	ENV: process.env.NODE_ENV ?? 'LOCAL',
	AWS_REGION: process.env.REGION,
	AWS_ACCESS_KEY_ID: process.env.ACCESS_KEY_ID ,
	AWS_SECRET_ACCESS_KEY:process.env.SECRET_ACCESS_KEY,
	SES_SOURCE_EMAIL: process.env.SES_SOURCE_EMAIL ?? 'aja28280@gmail.com',
	SMTP_USER: process.env.SMTP_USER ?? 'AKIAXEFUNQIIYG7WZ3WO',
    SMTP_PASS: process.env.SMTP_PASS ?? 'BK/Vzm1xNCOpRRqL9C4rdp8weuombpD3mrbCNDHiaLcK',
	CONTEXT: process.env.CONTEXT ?? '/Reservation-Mngr',
	PATHS: {
			OPERATIONS: {
				MovieCreate: `${VERSIONS.V1}/create/movie`,
				ReservationsCreate: `${VERSIONS.V1}/create/reservation`,
				RoomsCreate: `${VERSIONS.V1}/create/rooms`,
				MovieList: `${VERSIONS.V1}/list/movie`,
				ReservationsList: `${VERSIONS.V1}/list/reservation`,
				RoomsList: `${VERSIONS.V1}/list/rooms`,
			},
			RESOURCE_URI: process.env.CUSTOMER_URI ?? URI_DEFAULT,
			RESOURCES: {
				GET_CUSTOMER_V2: '/wsptdoapi/customer/v2/personal',
			},
		},
	RESOURCE: './static',
	OAS: {
		FILE: '/OAS.json',
		PATH: '/api-docs',
	},
};