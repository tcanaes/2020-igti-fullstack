function leftPad(value, count = 2, char = '0') {
  value = value + '';
  const padding = count - value.length;
  if (padding > 0) {
    for (let i = 0; i < padding; i++) {
      value = char + value;
    }
  }
  return value;
}

const timestamp = {
  getNewTimestamp: function () {
    const now = new Date();
    const result = `${leftPad(now.getDate())}/${leftPad(
      now.getMonth() + 1
    )}/${now.getFullYear()}-${leftPad(now.getHours())}:${leftPad(
      now.getMinutes()
    )}:${leftPad(now.getSeconds())}`;
    return result;
  },
};

export default timestamp;
