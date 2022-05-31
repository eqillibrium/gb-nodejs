import { streamTransformService } from "./3/transformStream";
import { streamFsService } from "./3/fsStreams";

streamTransformService('access.log', '89.123.1.41')
streamFsService('access.log', '34.48.240.111')
