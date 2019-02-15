import { CronJob } from 'cron'
import * as dir from 'dir_filenames'

type ClassSchedule = (path: string) => Promise<void>

export interface Schedule {
  disable?: boolean
  cron: string
  env: string | string[]
  timeZone: string
}

export declare class Subcription {
  public static schedule(): Schedule
  public subscribe(): void
}

export const schedule: ClassSchedule = async (path: string) => {
  const classfiles: string[] = dir(path)
  for await (let file of classfiles) {
    const classes = require(file)
    for (let i in classes) {
      const info: Schedule = classes[i].schedule()
      if (info.disable === true) {
        continue
      }
      if (info.env) {
        const env: string | string[] = info.env
        if (env.includes(process.env.NODE_ENV as string)) {
          const job: CronJob = new CronJob(
            info.cron,
            classes[i].prototype.subscribe,
            (): void => {},
            true,
            info.timeZone
          )
          job.start()
        }
      } else {
        const job: CronJob = new CronJob(
          info.cron,
          classes[i].prototype.subscribe,
          (): void => {},
          true,
          info.timeZone
        )
        job.start()
      }
    }
  }
}
