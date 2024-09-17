import { Shape } from '../lib/types';

export const makeDefaultShape = (entityNum: number): Shape => ({
  id: `shape${entityNum}`,
  displayName: `Shape ${entityNum}`,
  radius: 15,
  fill: '#ffffff',
  stroke: '#000000',
});
