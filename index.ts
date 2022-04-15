import assert from 'assert';
import { MyProtectedService } from './src/MyProtectedService';
import { Repository } from './src/Repository';
import { Roles } from './src/Roles';

// should throws an error when userRole is not provided
(async () => {
  const repository = new Repository();
  const service = new MyProtectedService(repository);

  assert.rejects(
    async () => {
      await service.execute({} as any);
    },
    (error) => {
      assert.deepStrictEqual(error, new Error('userRole not provided'));
      return true;
    }
  );
})();

// should throw an error when userRole is not allowed
(async () => {
  const repository = new Repository();
  const service = new MyProtectedService(repository);

  assert.rejects(
    async () => {
      await service.execute({ userRole: Roles.Regular, other: 1 });
    },
    (error) => {
      assert.deepStrictEqual(
        error,
        new Error(`It is expected role be ${[Roles.SuperAdmin]}, but got ${Roles.Regular}`)
      );
      return true;
    }
  );
})();

// should return result correctly when user role is valid
(async () => {
  const repository = new Repository();
  const service = new MyProtectedService(repository);

  const result = await service.execute({ userRole: Roles.SuperAdmin, other: 1 });

  assert.deepEqual(result, 'secret');
})();
