export const Types = {
  Submit: "submit",
  Reset: "reset",
  Button: "button",
} as const;

export type Types = (typeof Types)[keyof typeof Types];
