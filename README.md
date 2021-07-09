# Typescript strategy runner

Project created to facilitate the execution of business rules.

## Getting start

yarn add tssr
or
npm install tssr

## Creating domain classes

```typescript
import { Domain } from "tssr";

class Person extends Domain {
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
import { Runner } from "tssr";

class ValidatesName extends Runner<Person> {
  public execute(context: Context<Person>): Context<Person> {
    const name = context.getEntity().getName();

    if (!name) {
      context.setErrorMessages("The name field is required!");
    }
    return context;
  }
}
```

```typescript
import { Runner } from "tssr";

class ValidatesBirthday extends Runner<Person> {
  public execute(context: Context<Person>): Context<Person> {
    const age = context.getEntity().getBirthday().getFullYear();

    if (age <= 1900) {
      context.setErrorMessages("Invalid birthday date!");
    }
    return context;
  }
}
```

## Creating the execution of business rules

```typescript
import { Context } from "tssr";

let person = new Person();
person.setName("Test name");
person.setBirthday(new Date("01/01/2000"));

const context = new ValidatesName()
  .add(new ValidatesBirthday())
  .execute(new Context(person));
```

Result:

```
Context {
  entity: Person { name: 'Test name', birthday: 2000-01-01T02:00:00.000Z },
  errorMessages: [],
  successMessages: [],
  stopPropagation: false,
  status: 'ok'
}
```

If name is empty:

```typescript
person.setName("");
```

Result:

```
Context {
  entity: Person { name: '', birthday: 2000-01-01T02:00:00.000Z },
  errorMessages: [ 'The name field is required!' ],
  successMessages: [],
  stopPropagation: false,
  status: 'error'
}
```

If the name is empty and the year of the anniversary date is less than or equal to 1900:

```typescript
person.setName("");
person.setBirthday(new Date("01/01/1900"));
```

Result:

```
Context {
  entity: Person { name: '', birthday: 1900-01-01T03:06:28.000Z },
  errorMessages: [ 'The name field is required!', 'Invalid birthday date!' ],
  successMessages: [],
  stopPropagation: false,
  status: 'error'
}
```

If you want to stop propagation after a specific business rule, use: "context.setStopPropagation(true)"

```typescript
class ValidatesName extends Runner<Person> {
  public execute(context: Context<Person>): Context<Person> {
    const name = context.getEntity().getName();

    if (!name) {
      context.setErrorMessages("The name field is required!");
      context.setStopPropagation(true);
    }
    return context;
  }
}
```

```typescript
person.setName("");
person.setBirthday(new Date("01/01/1900"));
```

Result:

```
Context {
  entity: Person { name: '', birthday: 1900-01-01T03:06:28.000Z },
  errorMessages: [ 'The name field is required!' ],
  successMessages: [],
  stopPropagation: true,
  status: 'error'
}
```
