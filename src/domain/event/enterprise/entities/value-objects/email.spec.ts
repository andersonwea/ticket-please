import { Email } from './email'

describe('Email', () => {
  it('should be able to create an valid email', () => {
    const email = new Email('test@email.com')

    expect(email).toBeTruthy()
    expect(email.value).toBe('test@email.com')
  })

  it('should not be able to create an invalid email', () => {
    const invalidEmail = 'invalid-email'

    expect(() => new Email(invalidEmail)).toThrow('Invalid email')
  })
})
