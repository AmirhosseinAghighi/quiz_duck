export const useLatinToPersian = () => {
  const e2p = (s: string) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d as any]);

  return e2p;
};
