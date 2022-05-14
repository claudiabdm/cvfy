# CvFy

[![MadeWithVueJs.com shield](https://madewithvuejs.com/storage/repo-shields/3280-shield.svg)](https://madewithvuejs.com/p/cvfy/shield-link)

![CvFy](/static/CvFy.png)

CvFy is a simple CV maker that makes CV creation faster and easier in both English and Spanish. 

It's built with NuxtJs and deployed in Netlify. 

I usually enjoy styling from scratch but this time I've used TailwindCSS for the first time to see what all the fuss was about. 

PDF creation is client-side only, so results may differ among  browsers:
- Chrome desktop has the best print as the PDF created is exactly as the preview one but it is not good for ATSs. 
- Firefox print is exactly as the preview except for svg icons which are bit pixelated but it gives the best result for ATSs. 
- I used https://www.jobscan.co/ for checking ATSs.

It's also a PWA so it can be used offline.


Demo: https://cvfy.netlify.app/

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
