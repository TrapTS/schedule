# schedule
Trap schedule loader.

# install

```bash
npm install @trapts/schedule --save
```

# example

* app.ts

```typescript
import { schedule } from '@trapts/schedule'
import { resolve } from 'path'

schedule(resolve(__dirname, 'demo'))
```

* demo/test.ts

```typescript
import { Subcription, Schedule } from '@trapts/schedule'

export class TestSchedule implements Subcription {
  public static schedule(): Schedule {
    return {
      disable: false,
      cron: '1 * * * * *',
      env: 'development',
      timeZone: 'Asia/Shanghai'
    }
  }
  async subscribe(): Promise<void> {
    console.log('Hello World')
  }
}
```