import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      background: string;
      text: string;
      purple: string;
      red: string;
    };
  }
}
