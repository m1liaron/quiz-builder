
import { type ValueOf } from '@src/common/types/structure-utils';
import { ExceptionName } from '@src/libs/enums/exception-name.enum';
import { StatusCodes } from 'http-status-codes';

const DEFAULT_MESSAGE = 'Network Error';

type Constructor = {
    cause?: unknown;
    message: string;
    status: ValueOf<typeof StatusCodes>;
};

class HTTPError extends Error {
    public status: ValueOf<typeof StatusCodes>;

    public constructor({
        message = DEFAULT_MESSAGE,
        status = StatusCodes.INTERNAL_SERVER_ERROR
    }: Partial<Constructor> = {}) {
        super(message);
        this.status = status;
        this.name = ExceptionName.HTTP_ERROR;
    }
}

export { HTTPError };
