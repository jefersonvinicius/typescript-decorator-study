import { IService, secure, SecureParams } from './IService';
import { Repository } from './Repository';
import { Roles } from './Roles';

type Params = SecureParams & {
  other: number;
};

export class MyProtectedService implements IService<Params, string> {
  constructor(private repository: Repository) {}

  @secure({ allowed: [Roles.SuperAdmin] })
  async execute(params: Params): Promise<string> {
    console.log(params);
    const result = this.repository.protectedMethod();
    return result.myProtectedInfo;
  }
}
