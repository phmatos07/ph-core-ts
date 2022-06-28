import { Proxify } from './proxify';

describe('Proxify', () => {

  test('Class Proxify.proxy deve obter o retorno até level02 do ObjetoMock', () => {

    type ObjectType = {
      level01: {
        level02: {
          value: boolean;
        };
      }
    };

    const objectMock: ObjectType = {
      level01: {
        level02: {
          value: true
        }
      }
    };

    const value = Proxify.proxy(objectMock, 'level01.level02');
    expect(value).toBe(objectMock.level01.level02);
  });

  it('Class Proxify.proxy deve obter o retorno igual TRUE do ObjetoMock', () => {

    type ObjectType = {
      level01: {
        level02: {
          value: boolean;
        };
      }
    };

    const objectMock: ObjectType = {
      level01: {
        level02: {
          value: true
        }
      }
    };

    const value = Proxify.proxy<boolean>(objectMock, 'level01.level02.value');
    expect(value).toEqual(true);
  });
});
