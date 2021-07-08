import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    mainColor: string
    mq: {
      mobileS: string;
      mobileM: string;
      mobileL: string;
      tablet: string;
      laptop: string;
      laptopL: string;
      desktop: string;
    }
  }
}
