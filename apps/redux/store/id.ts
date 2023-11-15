type PrefixedId<P extends string> = `${P}${number}`;

export function chooseNextEntityNumber<
  P extends string,
  E extends { id: PrefixedId<P> },
>(entities: E[], prefix: P): number {
  const numbers = entities.map(
    (entity) => parseInt(entity.id.replace(prefix, ""), 10) || 0,
  );
  return (numbers.length ? Math.max(...numbers) : 0) + 1;
}
