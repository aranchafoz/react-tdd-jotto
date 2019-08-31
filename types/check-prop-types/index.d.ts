declare module 'check-prop-types' {
  export default function checkPropTypes(
    typeSpecs: object,
    values: object,
    location: string,
    componentName: string,
    getStack?: Function): string | null;
  export function assertPropTypes(): void;
}
