export default function p2c(angle, length) {
  return {x: Math.cos(angle) * length, y: Math.sin(angle) * length};
}
