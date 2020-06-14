import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '../../test/mock-http-clients'
import { mockAuthentication } from '/home/josmi/curso/src/domain/test/mock-authentication'
import faker from 'faker'


type SutTypes = {
  sut:RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = ( url: string = faker.internet.url() ): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  // system under test
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => { 
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })
})