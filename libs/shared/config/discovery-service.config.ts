
export interface RmqUrl {
  protocol?: string;
  hostname?: string;
  port?: number;
  username?: string;
  password?: string;
  locale?: string;
  frameMax?: number;
  heartbeat?: number;
  vhost?: string;
}

export interface DiscoveryServiceConfig {
  [key: string]: RmqUrl[] | string[];
}

const baseConnectionUrl = {
  hostname: '192.168.0.0.1',
  port: 5672,
  username: 'hoang',
  password: 'hoang',
  protocol: 'amqp',
};

export function discoveryServicesConfig(): DiscoveryServiceConfig {
  return {
    // MS_AUTH: [
    //   {
    //     ...baseConnectionUrl,
    //   },
    // ],
    // MS_SOCKET: [
    //   {
    //     ...baseConnectionUrl,
    //   },
    // ],
   
    // MS_ORGANIZATION: [
    //   {
    //     ...baseConnectionUrl,
    //   },
    // ],
    // MS_STORAGE: [
    //   {
    //     ...baseConnectionUrl,
    //   },
    // ],
    // MS_NOTIFICATION: [
    //   {
    //     ...baseConnectionUrl,
    //   },
    // ],
  };
}
