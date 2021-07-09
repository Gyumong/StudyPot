
export const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
  }
  
  const theme = {
    mainColor: '#26DE81',
    mq: {
        mobileS: `@media only screen and (min-width: ${size.mobileS})`,
        mobileM: `@media only screen and (min-width: ${size.mobileM})`,
        mobileL: `@media only screen and (min-width: ${size.mobileL}) `,
        tablet: `@media only screen and (min-width: ${size.tablet})`,
        laptop: `@media only screen and (min-width: ${size.laptop})`,
        laptopL: `@media only screen and (min-width: ${size.laptopL})`,
        desktop: `@media only screen and (min-width: ${size.desktop})`,
    },
  }
  
  export default theme;