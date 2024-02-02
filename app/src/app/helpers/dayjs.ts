import djs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

djs.extend(relativeTime)

export const dayjs = djs
