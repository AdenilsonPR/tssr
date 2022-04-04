# Typescript strategy runner

Project created to facilitate the execution of business rules.

## Getting start

yarn add tssr
or
npm install tssr

## Creating domain classes

```typescript
import { IEntity } from "tssr";

class Person implements IEntity {
  private name!: string;
  private birthday!: Date;

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getBirthday() {
    return this.birthday;
  }

  public setBirthday(birthday: Date) {
    this.birthday = birthday;
  }
}
```

## Creating classes that contain a business rule

```typescript
import { IStrategy } from "tssr";

class ValidatesName implements IStrategy<Person> {
  execute(entity: Person, context: Context): void {
    const name = entity.getName();

    if (!name) {
      context.addErrorMessages("The name field is required!");
    }
  }
}
```

```typescript
import { IStrategy } from "tssr";

class ValidatesBirthday implements IStrategy<Person> {
  execute(entity: Person, context: Context): void {
    const age = entity.getBirthday().getFullYear();

    if (age <= 1900) {
      context.addErrorMessages("Invalid birthday date!");
    }
  }
}
```

## Creating the execution of business rules

```typescript
import { Context } from "tssr";

let person = new Person();
person.setName("Test name");
person.setBirthday(new Date("01/01/2000"));

const context = new BuilderRunner()
  .add(new ValidatesName())
  .add(new ValidatesBirthday())
  .execute(person);
```

Result:

```
Result {
  entity: Person { name: 'Test name', birthday: 2000-01-01T02:00:00.000Z },
  messages: [],
  error: false
}
```

If name is empty:

```typescript
person.setName("");
```

Result:

```
Result {
  entity: Person { name: '', birthday: 2000-01-01T02:00:00.000Z },
  messages: [ 'The name field is required!' ],
  error: true
}
```

If the name is empty and the year of the anniversary date is less than or equal to 1900:

```typescript
person.setName("");
person.setBirthday(new Date("01/01/1900"));
```

Result:

```
Result {
  entity: Person { name: '', birthday: 1900-01-01T03:06:28.000Z },
  messages: [ 'The name field is required!', 'Invalid birthday date!' ],
  error: true
}
```

If you want to stop propagation after a specific business rule, use: "context.setStopPropagation(true)"

```typescript
class ValidatesName implements IStrategy<Person> {
  execute(entity: Person, context: Context): void {
    const name = entity.getName();

    if (!name) {
      context.addErrorMessages("The name field is required!");
      context.setStopPropagation(true);
    }
  }
}
```

```typescript
person.setName("");
person.setBirthday(new Date("01/01/1900"));
```

Result:

```
Result {
  entity: Person { name: '', birthday: 1900-01-01T03:06:28.000Z },
  messages: [ 'The name field is required!' ],
  error: true
}
```
