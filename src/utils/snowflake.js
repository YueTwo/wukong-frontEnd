import SnowflakeId from 'snowflake-id'

const snowflake = new SnowflakeId({
  mid: 42, // 机器ID
  offset: (2020 - 1970) * 31536000 * 1000 // 自定义时间戳开始偏移量，这里以2020年为起点
})
export const getSnowFlakeId = () => snowflake.generate()
