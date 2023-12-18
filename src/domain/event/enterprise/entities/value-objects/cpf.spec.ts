import { Cpf, InvalidCpfError } from './cpf'

describe('Cpf', () => {
  it('should be able to create a valid cpf', () => {
    const cpf = new Cpf('458.590.310-09')

    expect(cpf).toBeTruthy()
    expect(cpf.value).toBe('45859031009')
  })

  it('should not be able to create a valid cpf', () => {
    expect(() => new Cpf('123.456.789-10')).throw('CPF is invalid')
  })
})
