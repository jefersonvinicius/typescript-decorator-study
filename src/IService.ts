import { Roles } from './Roles';

export interface IService<Params = undefined, Result = void> {
  execute(params: Params): Promise<Result>;
}

export type SecureParams = {
  userRole: Roles;
};

type SecurityRules = {
  allowed: Roles[];
};

export function secure(rules: SecurityRules) {
  return (_: any, __: string, propDesc: PropertyDescriptor) => {
    const original: Function = propDesc.value;
    propDesc.value = function () {
      const params = arguments[0];

      if (!('userRole' in params)) throw new Error('userRole not provided');

      if (!rules.allowed.includes(Number(params.userRole)))
        throw new Error(`It is expected role be ${rules.allowed}, but got ${params.userRole}`);

      return original.apply(this, arguments);
    };
    return propDesc;
  };
}
