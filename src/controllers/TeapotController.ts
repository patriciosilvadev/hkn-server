import { JsonController, Get, HttpCode } from 'routing-controllers';
import logger from '@Logger';

@JsonController('/api/teapot')
export class TeapotController {
  @Get('/')
  @HttpCode(418)
  async getEvent(): Promise<string> {
    logger.debug({
      message: 'debug teapot',
      customTags: 'teapot',
    });

    logger.warn({
      message: 'info teapot',
      customTags: 'teapot',
    });

    logger.error({
      message: 'error teapot',
      customTags: 'teapot',
    });
    return 'I am a teapot!';
  }
}

export const TeapotControllerImpl = new TeapotController();
