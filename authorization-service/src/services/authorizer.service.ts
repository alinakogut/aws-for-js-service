export class AuthorizerService {
  public generatePolicy(
    principalId: string,
    resource: string,
    effect?: string
  ) {
    return {
      principalId,
      policyDocument: {
        Version: '2012-10-17',
        Statements: [
          {
            Action: 'execute-api:Invoke',
            Effect: effect || this.getEffect(principalId),
            Resource: resource,
          },
        ],
      },
    };
  }

  private getEffect(token: string): string {
    const buffer = Buffer.from(token, 'base64');
    const [username, password] = buffer.toString('utf-8').split(':');

    return this.validateCreds(username, password) ? 'Deny' : 'Allow';
  }

  private validateCreds(username: string, password: string): boolean {
    const storedPassword = process.env[username];
    return !storedPassword || storedPassword !== password;
  }
}
