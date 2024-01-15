export class Email {
  public value: string

  constructor(value: string) {
    this.value = value
    this.validate()
  }

  private validate() {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

    if (!emailRegex.test(this.value)) {
      throw new InvalidEmailError('Invalid email')
    }

    return this.value.trim()
  }
}

class InvalidEmailError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidEmailError'
  }
}
