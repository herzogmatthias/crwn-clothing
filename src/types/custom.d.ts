declare global {
  namespace NodeJS {
    interface Global {
      actions(wrapper: any, _action: any): Promise<void>;
    }
  }
}
export {};
