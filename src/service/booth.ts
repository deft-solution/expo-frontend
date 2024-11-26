import { IPagination } from '@/models/Pagination';
import { IBoothFilterParam, IBoothForm, IBootList } from '@/schema/Booth';
import { GET, GETWithToken, POSTWithToken, PUTWithToken } from '@Core';

export function createBooth(param: IBoothForm): Promise<IBootList> {
  const API_URL = '/api/booths/v1/create';
  return POSTWithToken<IBootList, IBoothForm>(API_URL, param);
}

export function findBoothOneId(id: string): Promise<IBootList> {
  const API_URL = '/api/booths/v1/' + id;
  return GETWithToken<IBootList, any>(API_URL, {});
}

export function getAllBoothForEvent(eventId: string): Promise<IBootList[]> {
  const API_URL = '/api/booths/v1/guest/' + eventId;
  return GET<IBootList[], any>(API_URL, {});
}

export function updateBoothByID(id: string, param: IBoothForm): Promise<IBootList> {
  const API_URL = '/api/booths/v1/' + id;
  return PUTWithToken<IBootList, IBoothForm>(API_URL, param);
}

export function getAllBooths(params: IBoothFilterParam): Promise<IPagination<IBootList>> {
  const API_URL = '/api/booths/v1/list';
  return GETWithToken<IPagination<IBootList>, {}>(API_URL, params);
}

export function uploadBoothTemplate(file: FormData): Promise<IBootList[]> {
  const header = { 'Content-Type': 'multipart/form-data' };
  const API_URL = '/api/booths/v1/xlsx/upload';

  return POSTWithToken<IBootList[]>(API_URL, file, header);
}
