// import { nodeEnv } from './config';
// import { startServer } from './useCases';
// import { dataSource } from './useCases/datasource.service';
// import { dynamoService } from './useCases/dynamo.service';
// import { httpServer } from './useCases/http-server';
// import { loggerService } from './useCases/logger.service';

if (nodeEnv !== 'testing') startServer(dataSource, dynamoService, loggerService, httpServer);
