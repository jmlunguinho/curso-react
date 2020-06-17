import { HttpPostParams, HttpPostClient, HttpResponse } from "@/data/protocols/http";
import axios from 'axios'
/* adapter AxiosHttpClientAdpter*/
export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const httResponse = await axios.post(params.url, params.body)
    return {
      statusCode: httResponse.status,
      body: httResponse.data
    }
  }
}