export function LogCall(messagePrefix: string = "CALL"): MethodDecorator {
  return (_target, propertyKey, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;

    if (typeof original !== "function") {
      throw new Error("@LogCall can only be applied to methods.");
    }

    descriptor.value = function (...args: unknown[]) {
      console.log(`[${messagePrefix}] ${String(propertyKey)} args=`, args);
      return original.apply(this, args);
    };

    return descriptor;
  };
}
