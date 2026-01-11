// additional.d.ts 또는 declarations.d.ts
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
